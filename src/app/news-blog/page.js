import Script from "next/script";
import BlogList from "./components/BlogList";

export const metadata = {
  title: "News & Blog | Sazin Construction Ltd.",
  description:
    "Latest updates, industry insights, and company news from Sazin Construction Ltd. Explore articles, blogs, and expert opinions.",
  alternates: {
    canonical: "https://sazin.com.bd/news-blog",
  },
  openGraph: {
    title: "News & Blog | Sazin Construction Ltd.",
    description:
      "Stay updated with the latest news, blogs, and insights from Sazin Construction Ltd.",
    url: "https://sazin.com.bd/news-blog",
    type: "website",
    images: [
      {
        url: "https://sazin.com.bd/og-news.jpg",
        width: 1200,
        height: 630,
        alt: "Sazin Construction Ltd. News and Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Blog | Sazin Construction Ltd.",
    description:
      "Latest updates, industry insights, and company news from Sazin Construction Ltd.",
    images: ["https://sazin.com.bd/og-news.jpg"],
  },
};

export default function NewsBlogPage() {
  return (
    <>
      <main className="bg-white dark:bg-neutral-950 min-h-screen py-16 px-6 lg:px-8">
        {/* Page Heading */}
        <h1 className="text-4xl font-semibold text-center dark:text-white mb-10">
          News <span className="text-red-600">& Blog</span>
        </h1>

        {/* Blog List */}
        <BlogList />
      </main>

      {/* ✅ JSON-LD Structured Data */}
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            url: "https://sazin.com.bd/news-blog",
            name: "News & Blog | Sazin Construction Ltd.",
            description:
              "Latest updates, industry insights, and company news from Sazin Construction Ltd.",
            publisher: {
              "@type": "Organization",
              name: "Sazin Construction Ltd.",
              logo: {
                "@type": "ImageObject",
                url: "https://sazin.com.bd/logo.png",
              },
            },
          }),
        }}
      />
    </>
  );
}
