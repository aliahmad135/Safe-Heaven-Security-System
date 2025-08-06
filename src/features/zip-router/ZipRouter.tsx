"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBrandForLocation } from "@/lib/brands";
import { Analytics } from "@/lib/analytics";
import {
  getAddressSuggestions,
  getPlaceDetails,
  AddressSuggestion,
} from "@/lib/google-maps";

interface ZipRouterProps {
  className?: string;
}

export function ZipRouter({ className = "" }: ZipRouterProps) {
  const [zipCode, setZipCode] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = async (value: string) => {
    setZipCode(value);
    setError("");

    if (value.length >= 3) {
      try {
        const addressSuggestions = await getAddressSuggestions(value);
        setSuggestions(addressSuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error getting suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (suggestion: AddressSuggestion) => {
    setZipCode(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);

    try {
      // If suggestion already contains zip/state (mock data case)
      if (suggestion.zipCode || suggestion.state) {
        handleLocationSubmit(
          suggestion.zipCode,
          suggestion.state,
          suggestion.description
        );
      } else {
        const details = await getPlaceDetails(suggestion.placeId);
        handleLocationSubmit(
          details.zipCode,
          details.state,
          details.formattedAddress
        );
      }
    } catch (error) {
      console.error("Error getting place details:", error);
    }
  };

  const handleLocationSubmit = (
    zip?: string,
    state?: string,
    address?: string
  ) => {
    const brand = getBrandForLocation(zip, state);

    if (brand) {
      Analytics.trackBrandRedirect("homepage", brand.id, zip || "");
      const queryParts: string[] = [];
      if (zip) queryParts.push(`zip=${zip}`);
      if (address) queryParts.push(`addr=${encodeURIComponent(address)}`);
      const query = queryParts.length ? `?${queryParts.join("&")}` : "";
      router.push(`/brand/${brand.slug}${query}`);
    } else {
      setError(
        "Sorry, we don't service that area yet. Please call for availability."
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!zipCode || zipCode.length < 3) {
      setError("Please enter a valid ZIP code or address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if it's a direct ZIP code
      if (/^\d{5}$/.test(zipCode)) {
        handleLocationSubmit(zipCode);
      } else {
        // Try to get ZIP from address
        const suggestions = await getAddressSuggestions(zipCode);
        if (suggestions.length > 0) {
          const details = await getPlaceDetails(suggestions[0].placeId);
          if (details.zipCode || details.state) {
            handleLocationSubmit(
              details.zipCode,
              details.state,
              details.formattedAddress
            );
          } else {
            setError("Unable to determine service area from address");
          }
        } else {
          setError("Please enter a valid ZIP code or address");
        }
      }
    } catch (err) {
      setError("Unable to process your request. Please try again.");
      console.error("ZIP router error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Find Your Local Security Provider</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enter your ZIP code to connect with your area&apos;s trusted security
          team
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter ZIP code or address"
              value={zipCode}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="text-center text-lg font-medium"
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm">{suggestion.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || zipCode.length < 3}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              "Finding Your Provider..."
            ) : (
              <>
                <span>Find My Local Provider</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            We serve 6 states across the Southeast with local expertise
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
