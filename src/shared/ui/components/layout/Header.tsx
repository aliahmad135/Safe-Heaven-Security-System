"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandConfig } from "@/lib/brands";
import {
  getPhoneNumber,
  formatPhoneNumber,
  createPhoneLink,
} from "@/lib/phone-utils";
import { Analytics } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";

interface HeaderProps {
  brand: BrandConfig;
  onCtaClick?: () => void;
  hidePhone?: boolean;
  hideCta?: boolean;
}

export function Header({
  brand,
  onCtaClick,
  hidePhone = false,
  hideCta = false,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const source = searchParams?.get("source") || undefined;
  const phoneNumber = getPhoneNumber(brand, source);

  useEffect(() => {
    Analytics.initialize();
  }, []);

  const handlePhoneClick = () => {
    Analytics.trackPhoneClick(phoneNumber, source || "header", brand.id);
  };

  const handleCtaClick = () => {
    Analytics.trackEvent({
      event: "cta_click",
      event_category: "engagement",
      event_action: "header_cta",
      event_label: brand.ctaText.primary,
      brand_id: brand.id,
    });
    onCtaClick?.();
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm"
      style={{
        borderBottomColor: brand.primaryColor + "20",
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {brand.name.charAt(0)}
            </div>
            <span
              className="text-lg sm:text-xl font-bold"
              style={{ color: brand.primaryColor }}
            >
              {brand.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#services"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link
              href="#coverage"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Coverage
            </Link>
          </nav>

          {/* Phone & CTA */}
          <div className="flex items-center space-x-4">
            {!hidePhone && (
              <a
                href={createPhoneLink(phoneNumber)}
                onClick={handlePhoneClick}
                className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">
                  {formatPhoneNumber(phoneNumber)}
                </span>
              </a>
            )}
            {!hideCta && (
              <Button
                onClick={handleCtaClick}
                className="hidden sm:inline-flex"
                style={{
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.primaryColor,
                }}
              >
                {brand.ctaText.primary}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-30 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown sheet */}
            <div className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg md:hidden z-40">
              <nav className="flex flex-col space-y-4 p-6">
                <Link
                  href="#services"
                  className="text-gray-800 font-medium px-2 py-2 rounded hover:text-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="#about"
                  className="text-gray-800 font-medium px-2 py-2 rounded hover:text-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#coverage"
                  className="text-gray-800 font-medium px-2 py-2 rounded hover:text-blue-500"
                  onClick={() => setIsOpen(false)}
                >
                  Coverage
                </Link>

                {false && (
                  <Button
                    onClick={handleCtaClick}
                    className="mt-2"
                    style={{
                      backgroundColor: brand.primaryColor,
                      borderColor: brand.primaryColor,
                    }}
                  >
                    {brand.ctaText.primary}
                  </Button>
                )}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
