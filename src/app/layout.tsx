import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SafeHaven Security Systems - Professional Home & Business Security',
  description: 'Protect what matters most with SafeHaven Security Systems. 24/7 monitoring, smart home integration, and rapid response across NC, SC, TN, GA, FL, and AL.',
  keywords: 'home security, business security, alarm systems, 24/7 monitoring, smart home, security cameras, SafeHaven',
  authors: [{ name: 'SafeHaven Security Systems' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'SafeHaven Security Systems - Professional Security Solutions',
    description: 'Trusted security systems with 24/7 monitoring and smart home integration across the Southeast.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Google Analytics / GTM would go here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // Add your GA tracking ID here in production
              // gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        
        {/* Analytics initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize analytics on page load
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Analytics initialization would happen here
                  console.log('SafeHaven Security - Analytics Ready');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}