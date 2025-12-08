import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import StatsSection from "./components/StatsSection";

// Lazy load below-the-fold with SSR true
const Banner=dynamic(()=>import('./components/Banner'),{ssr:true})
const Services=dynamic(()=>import('./components/Service'),{ssr:true})
const FeatureProducts=dynamic(()=>import('./components/FeatureProducts'),{ssr:true})
const Projects = dynamic(() => import("./components/Projects"), { ssr: true });
const Equipments = dynamic(() => import("./components/Equipments"), { ssr: true });
const Clients = dynamic(() => import("./components/Clients"), { ssr: true });
const Certificates = dynamic(() => import("./components/Certificates"), { ssr: true });
const LatestNews = dynamic(() => import("./components/LatestNews"), { ssr: true });
const Achievement = dynamic(() => import("./components/Achievement"), { ssr: true });
const CallToAction = dynamic(() => import("./components/CallToAction"), { ssr: true });

export default function Home() {
  return (
    <>
      {/* SEO Head */}
      <Head>
        <title>Intelligent Engineering | Home</title>
        <meta name="description" content="Intelligent Engineering provides top-quality construction, industrial, and safety solutions in Bangladesh. Explore our projects, products, and services." />
        <link rel="canonical" href="https://sazin.com.bd/" />

        {/* Open Graph */}
        <meta property="og:title" content="Intelligent Engineering | Home" />
        <meta property="og:description" content="Top-quality construction, industrial, and safety solutions in Bangladesh." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sazin.com.bd/" />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Intelligent Engineering | Home" />
        <meta name="twitter:description" content="Top-quality construction, industrial, and safety solutions in Bangladesh." />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>

      <main>
        {/* Above-the-fold */}
        <Banner />
        <FeatureProducts />
        {/* Below-the-fold lazy-loaded */}
        <Projects />
        <Services />
        <Equipments />
        <Clients />
        <Certificates />
        <LatestNews />
        <Achievement />
        <StatsSection />
        <CallToAction />
      </main>

      {/* JSON-LD Structured Data - lazy loaded after window load */}
      <Script
        id="organization-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Intelligent Engineering",
          "url": "https://sazin.com.bd/",
          "logo": "https://sazin.com.bd/logo.png",
          "sameAs": [
            "https://www.facebook.com/yourpage",
            "https://www.linkedin.com/company/yourcompany"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "02-58810754",
            "contactType": "customer service"
          }
        })}
      </Script>
    </>
  );
}
