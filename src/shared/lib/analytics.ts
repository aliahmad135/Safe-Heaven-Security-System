declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  address: string;
  serviceType: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  brandId: string;
  timestamp: string;
  sessionId: string;
  createdAt?: string;
}

export interface AnalyticsEvent {
  event: string;
  event_category?: string;
  event_action?: string;
  event_label?: string;
  value?: number;
  brand_id?: string;
  lead_data?: Partial<LeadData>;
}

export class Analytics {
  private static sessionId: string;

  static initialize() {
    if (typeof window === "undefined") return;

    // Generate session ID if not exists
    this.sessionId =
      sessionStorage.getItem("session_id") || this.generateSessionId();
    sessionStorage.setItem("session_id", this.sessionId);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    // Track page load
    this.trackEvent({
      event: "page_view",
      event_category: "engagement",
      event_action: "page_load",
    });
  }

  static trackEvent(eventData: AnalyticsEvent) {
    if (typeof window === "undefined") return;

    const enrichedData = {
      ...eventData,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
    };

    // Push to dataLayer for Google Analytics
    window.dataLayer?.push(enrichedData);

    // Console log for development
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", enrichedData);
    }
  }

  static trackFormStart(formType: string, brandId: string) {
    this.trackEvent({
      event: "form_start",
      event_category: "form",
      event_action: "start",
      event_label: formType,
      brand_id: brandId,
    });
  }

  static trackFormStep(step: number, formType: string, brandId: string) {
    this.trackEvent({
      event: "form_step",
      event_category: "form",
      event_action: "step_complete",
      event_label: formType,
      value: step,
      brand_id: brandId,
    });
  }

  static trackFormComplete(leadData: LeadData) {
    this.trackEvent({
      event: "form_complete",
      event_category: "form",
      event_action: "submit",
      event_label: "lead_form",
      brand_id: leadData.brandId,
      lead_data: leadData,
    });
  }

  static trackPhoneClick(phoneNumber: string, source: string, brandId: string) {
    this.trackEvent({
      event: "phone_click",
      event_category: "engagement",
      event_action: "phone_call",
      event_label: phoneNumber,
      brand_id: brandId,
      value: 1,
    });
  }

  static trackBrandRedirect(
    fromBrand: string,
    toBrand: string,
    zipCode: string
  ) {
    this.trackEvent({
      event: "brand_redirect",
      event_category: "navigation",
      event_action: "zip_redirect",
      event_label: `${fromBrand}_to_${toBrand}`,
      value: 1,
    });
  }

  private static generateSessionId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static getSessionId(): string {
    return this.sessionId;
  }

  static getUtmParams(searchParams: URLSearchParams) {
    return {
      utm_source: searchParams.get("utm_source") || undefined,
      utm_medium: searchParams.get("utm_medium") || undefined,
      utm_campaign: searchParams.get("utm_campaign") || undefined,
      utm_term: searchParams.get("utm_term") || undefined,
      utm_content: searchParams.get("utm_content") || undefined,
      source: searchParams.get("source") || undefined,
    };
  }
}
