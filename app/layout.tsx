import "@/styles/globals.css";
import { Metadata, Viewport, } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

import { keywords } from "@/config/seo-keywords";

export const metadata: Metadata = {
  metadataBase: new URL('https://mylolskins.com'),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: keywords,
  authors: [{ name: "Zentaury" }],
  icons: {
    icon: "/favicon.gif",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: "https://mylolskins.com",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@MyLoLSkinsApp",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="My LoL Skins" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.gif" type="image/gif" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteConfig.name,
              "url": "https://mylolskins.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mylolskins.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="Zentaury" data-description="Support me on Buy me a coffee!" data-message="Hey! You can also buy me a coffee or a skin ;)" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
        
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C7Z0FHXQQY"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C7Z0FHXQQY');
            `,
          }}
        />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
              <SpeedInsights />
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
