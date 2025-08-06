"use client";

import { useState } from "react";
import {
  Shield,
  Phone,
  Clock,
  Award,
  MapPin,
  Users,
  Home,
  Building,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeadForm } from "@features/lead-form";
import { ZipRouter } from "@features/zip-router";
import { BRAND_CONFIGS, DEFAULT_BRAND } from "@/lib/brands";

export default function HomePage() {
  const [showLeadForm, setShowLeadForm] = useState(false);
  // Generic corporate brand config derived from default brand colors
  const baseBrand = BRAND_CONFIGS[DEFAULT_BRAND];
  const brand = {
    ...baseBrand,
    id: "safehaven-corp",
    name: "SafeHaven Security",
    tagline: "Trusted Security Partner across the Southeast",
  } as typeof baseBrand;

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
      title: "Quick 15-Minute Response",
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
    { label: "Homes Protected", value: "50,000+" },
    { label: "Years Experience", value: "25+" },
    { label: "Response Time", value: "<15 min" },
    { label: "Customer Rating", value: "4.9/5" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header
        brand={brand}
        hidePhone
        hideCta
        onCtaClick={() => setShowLeadForm(true)}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                  Protect What
                  <br />
                  <span style={{ color: brand.primaryColor }}>
                    Matters Most
                  </span>
                </h1>
                <p className="text-base md:text-xl text-gray-600 leading-relaxed max-w-xl text-center lg:text-left">
                  {brand.tagline}. Professional security systems with 24/7
                  monitoring, smart home integration, and rapid response across
                  the Southeast.
                </p>
              </div>

              {/* Buttons removed on corporate landing page */}

              <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-600">
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

            <div className="space-y-10 lg:pl-8">
              <ZipRouter className="shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: brand.secondaryColor }}
                >
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section acts as "About" on homepage */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SafeHaven Security?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve been protecting families and businesses across the
              Southeast for over 25 years with cutting-edge technology and
              unmatched local service.
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
      <section id="coverage" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serving the Southeast
            </h2>
            <p className="text-xl text-gray-600">
              Local expertise across 6 states with regional security specialists
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(BRAND_CONFIGS).map((brandConfig, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: brandConfig.primaryColor }}
                    >
                      {brandConfig.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {brandConfig.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {brandConfig.coverage.states.join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {brandConfig.tagline}
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-medium">
                      Major Cities:
                    </p>
                    <p className="text-sm text-gray-600">
                      {brandConfig.coverage.cities.slice(0, 3).join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          </div>
        </div>
      </section>
      <div id="about"></div>
      <Footer brand={brand} />

      {/* Lead Form Modal */}
      <LeadForm
        brand={brand}
        isOpen={showLeadForm}
        onClose={() => setShowLeadForm(false)}
      />
    </div>
  );
}
