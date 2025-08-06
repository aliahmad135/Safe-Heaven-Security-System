export interface BrandConfig {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  phoneNumbers: {
    default: string;
    google: string;
    valpak: string;
    facebook: string;
    bing: string;
  };
  coverage: {
    states: string[];
    zipCodes: string[];
    cities: string[];
  };
  ctaText: {
    primary: string;
    secondary: string;
    form: string;
  };
  tagline: string;
  heroImage?: string;
  features: string[];
}

export const BRAND_CONFIGS: Record<string, BrandConfig> = {
  "safehaven-nc": {
    id: "safehaven-nc",
    name: "SafeHaven NC",
    slug: "safehaven-nc",
    primaryColor: "#1e40af",
    secondaryColor: "#3b82f6",
    accentColor: "#ef4444",
    phoneNumbers: {
      default: "(800) 123-4567",
      google: "(800) 123-4568",
      valpak: "(800) 123-4569",
      facebook: "(800) 123-4570",
      bing: "(800) 123-4571",
    },
    coverage: {
      states: ["NC"],
      zipCodes: ["27601", "28202", "27104", "28401", "27695"],
      cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
    },
    ctaText: {
      primary: "Get Free Security Quote",
      secondary: "Schedule Installation",
      form: "Protect Your NC Home Today",
    },
    tagline: "North Carolina's Trusted Security Partner",
    features: [
      "24/7 Monitoring",
      "Smart Home Integration",
      "Mobile App Control",
      "Professional Installation",
    ],
  },
  "safehaven-sc": {
    id: "safehaven-sc",
    name: "SafeHaven SC",
    slug: "safehaven-sc",
    primaryColor: "#059669",
    secondaryColor: "#10b981",
    accentColor: "#f59e0b",
    phoneNumbers: {
      default: "(800) 234-5678",
      google: "(800) 234-5679",
      valpak: "(800) 234-5680",
      facebook: "(800) 234-5681",
      bing: "(800) 234-5682",
    },
    coverage: {
      states: ["SC"],
      zipCodes: ["29201", "29403", "29605", "29501", "29464"],
      cities: [
        "Columbia",
        "Charleston",
        "Greenville",
        "Rock Hill",
        "Mount Pleasant",
      ],
    },
    ctaText: {
      primary: "Get Free Security Quote",
      secondary: "Schedule Installation",
      form: "Secure Your SC Property",
    },
    tagline: "South Carolina's Premier Security Solutions",
    features: [
      "Hurricane-Resistant Systems",
      "24/7 Monitoring",
      "Smart Technology",
      "Local Support",
    ],
  },
  "safehaven-tn": {
    id: "safehaven-tn",
    name: "SafeHaven TN",
    slug: "safehaven-tn",
    primaryColor: "#7c3aed",
    secondaryColor: "#8b5cf6",
    accentColor: "#f97316",
    phoneNumbers: {
      default: "(800) 345-6789",
      google: "(800) 345-6790",
      valpak: "(800) 345-6791",
      facebook: "(800) 345-6792",
      bing: "(800) 345-6793",
    },
    coverage: {
      states: ["TN"],
      zipCodes: ["37201", "38103", "37402", "37660", "38111"],
      cities: [
        "Nashville",
        "Memphis",
        "Knoxville",
        "Chattanooga",
        "Clarksville",
      ],
    },
    ctaText: {
      primary: "Get Free Security Quote",
      secondary: "Schedule Installation",
      form: "Protect Your TN Home",
    },
    tagline: "Tennessee's Most Trusted Security Provider",
    features: [
      "Storm-Proof Systems",
      "24/7 Support",
      "Smart Home Tech",
      "Quick Response",
    ],
  },
  topsecurity: {
    id: "topsecurity",
    name: "TopSecurity",
    slug: "topsecurity",
    primaryColor: "#dc2626",
    secondaryColor: "#ef4444",
    accentColor: "#1e40af",
    phoneNumbers: {
      default: "(800) 456-7890",
      google: "(800) 456-7891",
      valpak: "(800) 456-7892",
      facebook: "(800) 456-7893",
      bing: "(800) 456-7894",
    },
    coverage: {
      states: ["GA"],
      zipCodes: ["30309", "30002", "31405", "30901", "30144"],
      cities: ["Atlanta", "Alpharetta", "Savannah", "Augusta", "Marietta"],
    },
    ctaText: {
      primary: "Get Top-Tier Protection",
      secondary: "Expert Installation",
      form: "Secure Georgia Properties",
    },
    tagline: "Georgia's Top-Rated Security Systems",
    features: [
      "Advanced AI Detection",
      "Professional Monitoring",
      "Smart Integration",
      "Rapid Response",
    ],
  },
  bestsecurity: {
    id: "bestsecurity",
    name: "BestSecurity",
    slug: "bestsecurity",
    primaryColor: "#ea580c",
    secondaryColor: "#f97316",
    accentColor: "#059669",
    phoneNumbers: {
      default: "(800) 567-8901",
      google: "(800) 567-8902",
      valpak: "(800) 567-8903",
      facebook: "(800) 567-8904",
      bing: "(800) 567-8905",
    },
    coverage: {
      states: ["FL"],
      zipCodes: ["33101", "32801", "33602", "32501", "33401"],
      cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
    },
    ctaText: {
      primary: "Get Best-in-Class Security",
      secondary: "Premium Installation",
      form: "Protect Your Florida Home",
    },
    tagline: "Florida's Best Security Solutions",
    features: [
      "Hurricane Protection",
      "Smart Home Ready",
      "24/7 Monitoring",
      "Mobile Control",
    ],
  },
  redhawk: {
    id: "redhawk",
    name: "RedHawk Alarms",
    slug: "redhawk",
    primaryColor: "#991b1b",
    secondaryColor: "#dc2626",
    accentColor: "#f59e0b",
    phoneNumbers: {
      default: "(800) 678-9012",
      google: "(800) 678-9013",
      valpak: "(800) 678-9014",
      facebook: "(800) 678-9015",
      bing: "(800) 678-9016",
    },
    coverage: {
      states: ["AL"],
      zipCodes: ["35201", "36801", "35801", "36502", "35401"],
      cities: [
        "Birmingham",
        "Montgomery",
        "Huntsville",
        "Mobile",
        "Tuscaloosa",
      ],
    },
    ctaText: {
      primary: "Get RedHawk Protection",
      secondary: "Expert Setup",
      form: "Secure Your Alabama Property",
    },
    tagline: "Alabama's Most Vigilant Security",
    features: [
      "Advanced Detection",
      "Storm-Ready Systems",
      "Quick Response",
      "Local Expertise",
    ],
  },
};

export const DEFAULT_BRAND = "safehaven-nc";

export function getBrandBySlug(slug: string): BrandConfig | null {
  return BRAND_CONFIGS[slug] || null;
}

export function getBrandByZip(zipCode: string): BrandConfig | null {
  for (const brand of Object.values(BRAND_CONFIGS)) {
    // Check exact match first
    if (brand.coverage.zipCodes.includes(zipCode)) {
      return brand;
    }
    // Then check by first 3 digits
    if (
      brand.coverage.zipCodes.some(
        (zip) => zip.substring(0, 3) === zipCode.substring(0, 3)
      )
    ) {
      return brand;
    }
  }
  return null;
}

export function getBrandByState(state: string): BrandConfig | null {
  for (const brand of Object.values(BRAND_CONFIGS)) {
    if (brand.coverage.states.includes(state)) {
      return brand;
    }
  }
  return null;
}

export function getBrandForLocation(
  zipCode?: string,
  state?: string
): BrandConfig | null {
  if (zipCode) {
    const byZip = getBrandByZip(zipCode);
    if (byZip) return byZip;
  }
  if (state) {
    const byState = getBrandByState(state);
    if (byState) return byState;
  }
  return null;
}

export function getAllBrands(): BrandConfig[] {
  return Object.values(BRAND_CONFIGS);
}
