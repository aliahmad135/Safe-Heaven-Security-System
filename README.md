# SafeHaven Security Systems - Multi-Brand Website MVP

A scalable, mobile-first multi-brand security systems website built with Next.js, featuring dynamic brand routing, real-time weather integration, and comprehensive lead capture.

## 🚀 Features

### Multi-Brand Architecture

- **6 Regional Brands**: SafeHaven NC/SC/TN, TopSecurity (GA), BestSecurity (FL), RedHawk Alarms (AL)
- **Scalable Design**: Add new brands by updating JSON config only
- **Dynamic Routing**: `/brand/[slug]` with automatic brand detection
- **ZIP-based Routing**: Automatic brand selection based on service area

### Lead Generation System

- **Progressive Multi-Step Form**: Name/Email/Phone → Location → Service Type
- **Google Maps Integration**: Address autocomplete and ZIP code detection
- **Session Persistence**: Form data saved in localStorage for returning users
- **Real-time Weather**: Personalized weather data for user's location
- **UTM Tracking**: Complete attribution tracking for marketing campaigns

### Performance & Mobile-First

- **Next.js 13+**: App Router with SSG/SSR optimization
- **Mobile-First Design**: Optimized for 85% mobile traffic
- **Lighthouse Score**: Targeting 85+ mobile performance
- **Lazy Loading**: Images, components, and API calls
- **Code Splitting**: Automatic bundle optimization

### Analytics & Tracking

- **Dynamic Phone Numbers**: Source-based phone number insertion
- **DataLayer Integration**: GA4/Segment ready tracking
- **Lead Attribution**: Complete funnel tracking from source to conversion
- **Session Management**: User journey tracking and analytics

## 🛠 Tech Stack

- **Frontend**: Next.js 13+, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **APIs**: Google Maps Places API, OpenWeather API
- **Forms**: React Hook Form with Zod validation
- **Analytics**: Custom analytics layer with dataLayer support
- **Deployment**: Static export ready for CDN deployment

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                 # Homepage (SafeHaven default)
│   ├── brand/[slug]/page.tsx    # Dynamic brand pages
│   ├── api/
│   │   ├── leads/route.ts       # Lead submission endpoint
│   │   └── weather/route.ts     # Weather data endpoint
│   └── layout.tsx               # Root layout with analytics
├── components/
│   ├── forms/LeadForm.tsx       # Progressive multi-step form
│   ├── layout/                  # Header, Footer components
│   ├── widgets/                 # Weather, ZIP router widgets
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── brands.ts                # Brand configurations
│   ├── analytics.ts             # Analytics and tracking
│   ├── google-maps.ts           # Google Maps API integration
│   ├── weather-api.ts           # Weather API integration
│   └── phone-utils.ts           # Phone number utilities
```

## 🔧 Setup & Installation

1. **Clone and Install**

   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env.local` with your API keys:

   ```env
   GOOGLE_PLACES_API_KEY=your_google_places_key
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
   ```

3. **Development**

   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 🌐 API Integration

### Google Maps Places API

- Address autocomplete in lead forms
- ZIP code detection and validation
- Place details for accurate location data

### OpenWeather API

- Real-time weather data by ZIP code
- Personalized weather messaging
- Weather-based security messaging

## 📊 Brand Configuration

Add new brands by updating `lib/brands.ts`:

```typescript
'new-brand': {
  id: 'new-brand',
  name: 'New Security Brand',
  slug: 'new-brand',
  primaryColor: '#1e40af',
  phoneNumbers: {
    default: '(800) 123-4567',
    google: '(800) 123-4568',
    // ... source-specific numbers
  },
  coverage: {
    states: ['TX'],
    zipCodes: ['75001', '75002'],
    cities: ['Dallas', 'Houston'],
  },
  // ... other brand config
}
```

## 🎯 Lead Capture Flow

1. **ZIP Entry**: User enters ZIP code or address
2. **Brand Detection**: System identifies serving brand
3. **Brand Redirect**: User redirected to brand-specific page
4. **Weather Display**: Local weather shown for personalization
5. **Progressive Form**: Multi-step form with session persistence
6. **Address Autocomplete**: Google Maps integration
7. **Lead Submission**: Data sent to `/api/leads` with full attribution

## 📱 Mobile Optimization

- **Touch-First Design**: Large tap targets, swipe gestures
- **Performance**: Lazy loading, code splitting, image optimization
- **Responsive**: Breakpoints optimized for mobile usage patterns
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🔍 SEO & Analytics

- **Static Generation**: Pre-rendered pages for SEO
- **Meta Tags**: Dynamic meta tags per brand
- **Structured Data**: Local business schema markup
- **Analytics Ready**: GA4, Segment, custom tracking

## 🚀 Deployment

The project is configured for static export and can be deployed to:

- Netlify
- Vercel
- AWS S3 + CloudFront
- Any static hosting provider

```bash
npm run build
# Outputs to ./out/ directory
```

## 📈 Performance Features

- **Lighthouse Optimized**: Targeting 85+ mobile score
- **Core Web Vitals**: Optimized LCP, FID, CLS
- **Bundle Analysis**: Automatic code splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Preloaded web fonts

## 🔐 Security Features

- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized inputs
- **CSRF Protection**: Built-in Next.js protection
- **Environment Variables**: Secure API key management

## 📞 Dynamic Phone Numbers

Phone numbers change based on traffic source:

- `?source=google` → Google Ads tracking number
- `?source=valpak` → Valpak campaign number
- `?source=facebook` → Facebook Ads number
- Default → Main business number

## 🎨 Brand Customization

Each brand automatically gets:

- Custom color schemes
- Brand-specific messaging
- Localized phone numbers
- Regional service areas
- Customized CTAs and forms

---

Built with ❤️ for scalable multi-brand lead generation

## 🛠️ Local Development

1. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```
2. **Create an environment file**
   Copy `env.example` to `.env.local` (dot-file) and add your keys:
   ```bash
   cp env.example .env.local
   ```
   Then edit `.env.local` and fill in:
   ```env
   GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_KEY
   NEXT_PUBLIC_OPENWEATHER_API_KEY=YOUR_OPENWEATHER_KEY
   ```
3. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 in your browser.

### Troubleshooting

- If you change environment variables, restart the dev server.
- Linter warnings about `process` in API routes are safe to ignore in Next.js.

---
