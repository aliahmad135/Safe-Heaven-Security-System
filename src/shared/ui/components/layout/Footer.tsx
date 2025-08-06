import Link from 'next/link';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';
import { BrandConfig } from '@/lib/brands';
import { getPhoneNumber, formatPhoneNumber, createPhoneLink } from '@/lib/phone-utils';

interface FooterProps {
  brand: BrandConfig;
  source?: string;
}

export function Footer({ brand, source }: FooterProps) {
  const phoneNumber = getPhoneNumber(brand, source);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: brand.primaryColor }}
              >
                {brand.name.charAt(0)}
              </div>
              <span className="text-xl font-bold">{brand.name}</span>
            </div>
            <p className="text-gray-300 text-sm">{brand.tagline}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Shield className="w-4 h-4" />
              <span>Licensed & Insured</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="#services" className="hover:text-white transition-colors">Home Security</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Business Security</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Smart Home</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Video Surveillance</Link></li>
              <li><Link href="#services" className="hover:text-white transition-colors">Access Control</Link></li>
            </ul>
          </div>

          {/* Coverage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Coverage Areas</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {brand.coverage.cities.slice(0, 5).map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
            <p className="text-xs text-gray-400">
              Serving {brand.coverage.states.join(', ')}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <a
                href={createPhoneLink(phoneNumber)}
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{formatPhoneNumber(phoneNumber)}</span>
              </a>
              <a
                href="mailto:info@safehavensecurity.com"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Get Quote</span>
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>24/7 Service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} {brand.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/licenses" className="hover:text-white transition-colors">Licenses</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}