import dynamic from "next/dynamic";
import Script from "next/script";

// ✅ Lazy Import (code splitting)
const HeroCivil = dynamic(() => import("./components/HeroCivil"), { ssr: true });
const Highlights = dynamic(() => import("./components/Highlights"), { ssr: true });
const ServicesCivil = dynamic(() => import("./components/ServicesCivil"), { ssr: true });
const ProcessCivil = dynamic(() => import("./components/ProcessCivil"), { ssr: true });
const StandardsCivil = dynamic(() => import("./components/StandardsCivil"), { ssr: true });
const ProjectsCivil = dynamic(() => import("./components/ProjectsCivil"), { ssr: true });
const ContactCivil = dynamic(() => import("./components/ContactCivil"), { ssr: true });

export const metadata = {
  title: "Civil Construction | Sazin Construction Ltd.",
  description:
    "Residential, commercial, and industrial building construction solutions with quality, safety, and timely delivery from Sazin Construction Ltd.",
  openGraph: {
    title: "Civil Construction | Sazin Construction Ltd.",
    description:
      "Residential, commercial, and industrial building construction solutions with quality, safety, and timely delivery from Sazin Construction Ltd.",
    url: "https://sazin.com.bd/Civil-construction",
    siteName: "Sazin Construction Ltd.",
    images: [
      {
        url: "https://sazin.com.bd/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Civil Construction Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// ✅ JSON-LD Structured Data
const civilJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Civil Construction",
  provider: {
    "@type": "Organization",
    name: "Sazin Construction Ltd.",
    url: "https://sazin.com.bd",
    logo: "https://sazin.com.bd/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "House #42, Road #07, Section-10, Mirpur",
      addressLocality: "Dhaka",
      postalCode: "1216",
      addressCountry: "Bangladesh",
    },
  },
  areaServed: {
    "@type": "Country",
    name: "Bangladesh",
  },
  description:
    "Residential, commercial, and industrial building construction solutions with quality, safety, and timely delivery from Sazin Construction Ltd.",
};

export default function CivilConstructionPage() {
  return (
    <main>
      {/* ✅ JSON-LD lazy load */}
      <Script
        id="civil-jsonld"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(civilJsonLd) }}
      />

      <HeroCivil />
      <Highlights />
      <ServicesCivil />
      <ProcessCivil />
      <StandardsCivil />
      <ProjectsCivil />
      <ContactCivil />
    </main>
  );
}
