"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Phone, Mail, MapPin, Home } from "lucide-react";
import { BrandConfig } from "@/lib/brands";
import { Analytics, LeadData } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";
import {
  getAddressSuggestions,
  getPlaceDetails,
  AddressSuggestion,
} from "@/lib/google-maps";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  address: z.string().min(5, "Please enter your address"),
  serviceType: z.string().min(1, "Please select a service type"),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  brand: BrandConfig;
  onClose?: () => void;
  isOpen?: boolean;
  initialZip?: string;
  initialAddress?: string;
}

const STEPS = [
  { id: 1, title: "Personal Info", icon: Phone },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Service", icon: Home },
];

const SERVICE_TYPES = [
  "Home Security System",
  "Business Security",
  "Smart Home Integration",
  "Video Surveillance",
  "Access Control",
  "Fire & Life Safety",
];

export function LeadForm({
  brand,
  onClose,
  isOpen = true,
  initialZip,
  initialAddress,
}: LeadFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<
    AddressSuggestion[]
  >([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      zipCode: initialZip || "",
      address: initialAddress || "",
      serviceType: "",
    },
  });

  // Load saved form data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(`leadForm_${brand.id}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          Object.keys(parsedData).forEach((key) => {
            if (parsedData[key]) {
              form.setValue(key as keyof FormData, parsedData[key]);
            }
          });
        } catch (error) {
          console.error("Error loading saved form data:", error);
        }
      }

      // Track form start
      Analytics.trackFormStart("lead_form", brand.id);
    }
  }, [brand.id, form]);

  // Save form data on change
  const saveFormData = (data: Partial<FormData>) => {
    if (typeof window !== "undefined") {
      const currentData = localStorage.getItem(`leadForm_${brand.id}`);
      const merged = currentData
        ? { ...JSON.parse(currentData), ...data }
        : data;
      localStorage.setItem(`leadForm_${brand.id}`, JSON.stringify(merged));
    }
  };

  const handleAddressChange = async (value: string) => {
    form.setValue("address", value);
    saveFormData({ address: value });

    if (value.length >= 3) {
      try {
        const suggestions = await getAddressSuggestions(value);
        setAddressSuggestions(suggestions);
        setShowAddressSuggestions(true);
      } catch (error) {
        console.error("Error getting address suggestions:", error);
      }
    } else {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
    }
  };

  const handleAddressSuggestionClick = async (
    suggestion: AddressSuggestion
  ) => {
    form.setValue("address", suggestion.description);
    setShowAddressSuggestions(false);
    setAddressSuggestions([]);
    saveFormData({ address: suggestion.description });

    // Use ZIP code from suggestion if available
    if (suggestion.zipCode) {
      form.setValue("zipCode", suggestion.zipCode);
      saveFormData({ zipCode: suggestion.zipCode });
    } else {
      try {
        const details = await getPlaceDetails(suggestion.placeId);
        if (details.zipCode) {
          form.setValue("zipCode", details.zipCode);
          saveFormData({ zipCode: details.zipCode });
        }
      } catch (error) {
        console.error("Error getting place details:", error);
      }
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      saveFormData(form.getValues());
      Analytics.trackFormStep(currentStep, "lead_form", brand.id);
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ["name", "email", "phone"];
      case 2:
        return ["zipCode", "address"];
      case 3:
        return ["serviceType"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const utmParams = Analytics.getUtmParams(
        new URLSearchParams(searchParams?.toString())
      );

      const leadData: LeadData = {
        ...data,
        ...utmParams,
        brandId: brand.id,
        timestamp: new Date().toISOString(),
        sessionId: Analytics.getSessionId(),
      };

      // Submit to API
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        Analytics.trackFormComplete(leadData);
        setIsSuccess(true);

        // Clear saved form data
        localStorage.removeItem(`leadForm_${brand.id}`);

        // Auto-close after success
        setTimeout(() => {
          onClose?.();
        }, 3000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error (you might want to show an error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const progress = (currentStep / STEPS.length) * 100;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: brand.primaryColor }}
            >
              <Phone className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="mb-2">Thank You!</CardTitle>
            <p className="text-gray-600 mb-4">
              We&apos;ve received your information and will contact you within
              15 minutes to discuss your security needs.
            </p>
            <p className="text-sm text-gray-500">
              You can also call us directly at{" "}
              <span className="font-medium">{brand.phoneNumbers.default}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: brand.primaryColor }}>
              {brand.ctaText.form}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Step {currentStep} of {STEPS.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center space-x-4 mt-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    onChange={(e) => {
                      form.setValue("name", e.target.value);
                      saveFormData({ name: e.target.value });
                    }}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    onChange={(e) => {
                      form.setValue("email", e.target.value);
                      saveFormData({ email: e.target.value });
                    }}
                    placeholder="Enter your email address"
                    className="mt-1"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...form.register("phone")}
                    onChange={(e) => {
                      form.setValue("phone", e.target.value);
                      saveFormData({ phone: e.target.value });
                    }}
                    placeholder="(555) 123-4567"
                    className="mt-1"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    {...form.register("zipCode")}
                    readOnly
                    className="mt-1 bg-gray-100 cursor-not-allowed"
                  />
                  {form.formState.errors.zipCode && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.zipCode.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Property Address *</Label>
                  <div className="relative">
                    <Input
                      id="address"
                      {...form.register("address")}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onFocus={() =>
                        addressSuggestions.length > 0 &&
                        setShowAddressSuggestions(true)
                      }
                      onBlur={() =>
                        setTimeout(() => setShowAddressSuggestions(false), 200)
                      }
                      placeholder="123 Main Street, City, State"
                      className="mt-1"
                    />

                    {showAddressSuggestions &&
                      addressSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                          {addressSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              onClick={() =>
                                handleAddressSuggestionClick(suggestion)
                              }
                            >
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="text-sm">
                                  {suggestion.description}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                {/* Weather removed in modal */}
              </div>
            )}

            {/* Step 3: Service Type */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceType">
                    What service are you interested in? *
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("serviceType", value);
                      form.clearErrors("serviceType");
                      saveFormData({ serviceType: value });
                    }}
                    defaultValue={form.getValues("serviceType")}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_TYPES.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.serviceType && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.serviceType.message}
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• We&apos;ll call you within 15 minutes</li>
                    <li>• Free security consultation</li>
                    <li>• Custom quote for your property</li>
                    <li>• Professional installation scheduling</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep < STEPS.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {isSubmitting ? "Submitting..." : "Get My Quote"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
