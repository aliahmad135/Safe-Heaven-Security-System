"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Shield,
  Phone,
  Clock,
  Award,
  MapPin,
  Users,
  Home,
  Building,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadForm } from "@features/lead-form";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { getBrandBySlug, DEFAULT_BRAND, BRAND_CONFIGS } from "@/lib/brands";

export default function BrandPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showLeadForm, setShowLeadForm] = useState(false);

  const slug = params?.slug as string;
  const zipCode = searchParams?.get("zip") || undefined;
  const source = searchParams?.get("source") || undefined;
  const initialAddress = searchParams?.get("addr") || undefined;

  const brand = getBrandBySlug(slug) || BRAND_CONFIGS[DEFAULT_BRAND];

  useEffect(() => {
    // Auto-open lead form if coming from ZIP redirect
    if (zipCode) {
      setTimeout(() => setShowLeadForm(true), 1000);
    }
  }, [zipCode]);

  const features = [
    {
      icon: Shield,
      title: "24/7 Professional Monitoring",
      description:
        "Round-the-clock protection with immediate emergency response",
    },
    {
      icon: Phone,
      title: "Smart Home Integration",
      description:
        "Control your security system and smart devices from anywhere",
    },
    {
      icon: Clock,
      title: "Quick Response Time",
      description: "Local technicians respond fast when you need help most",
    },
    {
      icon: Award,
      title: "Licensed & Insured",
      description: "Fully certified security professionals you can trust",
    },
  ];

  const services = [
    {
      icon: Home,
      title: "Residential Security",
      description: "Comprehensive home security systems with smart technology",
      features: [
        "Door/Window Sensors",
        "Motion Detectors",
        "Smart Cameras",
        "Mobile App",
      ],
    },
    {
      icon: Building,
      title: "Commercial Security",
      description: "Advanced business security solutions for any industry",
      features: [
        "Access Control",
        "Video Surveillance",
        "Fire Safety",
        "Remote Monitoring",
      ],
    },
  ];

  const stats = [
    { label: "Homes Protected", value: "10,000+" },
    { label: "Years in Business", value: "15+" },
    { label: "Response Time", value: "<15 min" },
    { label: "Customer Rating", value: "4.9/5" },
  ];

  if (!brand) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Brand Not Found</h1>
          <p className="text-gray-600">
            The requested security provider could not be found.
          </p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        brand={brand}
        hidePhone={true}
        hideCta={true}
        onCtaClick={() => setShowLeadForm(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-8 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {zipCode && (
            <div className="mb-6 text-center">
              <div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: brand.primaryColor + "10",
                  color: brand.primaryColor,
                }}
              >
                <MapPin className="w-4 h-4" />
                <span>Serving your area: {zipCode}</span>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span style={{ color: brand.primaryColor }}>
                    {brand.name}
                  </span>
                  <br />
                  Security Systems
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {brand.tagline}. Professional security systems with 24/7
                  monitoring, smart home integration, and rapid local response.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => setShowLeadForm(true)}
                  className="text-lg px-8 py-6"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  {brand.ctaText.primary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                  style={{
                    borderColor: brand.primaryColor,
                    color: brand.primaryColor,
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call {brand.phoneNumbers.default}
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Licensed & insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Local experts</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <WeatherWidget zipCode={zipCode} className="shadow-lg" />

              <Card
                className="shadow-lg"
                style={{ borderColor: brand.primaryColor + "20" }}
              >
                <CardContent className="p-6">
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: brand.primaryColor }}
                  >
                    Why Choose {brand.name}?
                  </h3>
                  <ul className="space-y-2">
                    {brand.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Shield
                          className="w-4 h-4 mr-2 flex-shrink-0"
                          style={{ color: brand.primaryColor }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-16"
        style={{ backgroundColor: brand.primaryColor }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section acts as About */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose {brand.name}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve been protecting families and businesses in{" "}
              {brand.coverage.states.join(" and ")}
              with cutting-edge technology and unmatched local service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{
                        backgroundColor: brand.primaryColor + "10",
                        color: brand.primaryColor,
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Security Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Professional security systems tailored to your specific needs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: brand.primaryColor }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-3 text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <Shield
                                className="w-4 h-4 mr-2 flex-shrink-0"
                                style={{ color: brand.primaryColor }}
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving {brand.coverage.states.join(" & ")}
            </h2>
            <p className="text-xl text-gray-600">
              Local expertise with regional security specialists
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: brand.primaryColor }}
                    >
                      Major Service Areas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {brand.coverage.cities.map((city, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <MapPin
                            className="w-4 h-4"
                            style={{ color: brand.primaryColor }}
                          />
                          <span className="text-gray-700">{city}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold mb-4"
                      style={{ color: brand.primaryColor }}
                    >
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Phone
                          className="w-4 h-4"
                          style={{ color: brand.primaryColor }}
                        />
                        <span className="text-gray-700">
                          {brand.phoneNumbers.default}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock
                          className="w-4 h-4"
                          style={{ color: brand.primaryColor }}
                        />
                        <span className="text-gray-700">
                          24/7 Emergency Service
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award
                          className="w-4 h-4"
                          style={{ color: brand.primaryColor }}
                        />
                        <span className="text-gray-700">
                          Licensed & Insured
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Secure Your Peace of Mind?
            </h2>
            <p className="text-xl text-gray-300">
              Get a free security consultation and custom quote for your
              property. Our local experts will call you within 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowLeadForm(true)}
                className="text-lg px-8 py-6"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Shield className="w-5 h-5 mr-2" />
                {brand.ctaText.form}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call {brand.phoneNumbers.default}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer brand={brand} source={source} />

      {/* Lead Form Modal */}
      <LeadForm
        brand={brand}
        isOpen={showLeadForm}
        initialZip={zipCode}
        initialAddress={initialAddress}
        onClose={() => setShowLeadForm(false)}
      />
    </div>
  );
}
