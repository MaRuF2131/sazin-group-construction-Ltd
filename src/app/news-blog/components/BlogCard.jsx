"use client";
import { useState } from "react";
import Image from "next/image";
import Script from "next/script";

export default function BlogCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.newstitle,
    image: post.imageUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "sazin construction ltd",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    description: post?.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160),
  };

  return (
    <article className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="w-full aspect-[16/9] overflow-hidden">
        <Image
          src={post?.imageUrl}
          alt={post?.newstitle}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder.png"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          {new Date(post?.date).toLocaleString()} · {post?.author}
        </div>

        <h3 className="text-xl font-semibold mt-2 text-neutral-900 dark:text-neutral-100">
          {post.newstitle}
        </h3>

        <p className="mt-2 text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {expanded
            ? post?.description
            : post?.description.slice(0, 100) +
              (post?.description.length > 100 ? "..." : "")}
        </p>

        <button
          onClick={() => setExpanded(!expanded)}
          disabled={post?.description.length <= 100}
          aria-expanded={expanded}
          className={`mt-4 inline-block text-red-600 font-semibold ${
            post?.description.length <= 100
              ? "cursor-not-allowed opacity-50"
              : "hover:underline underline-offset-3"
          } transition`}
        >
          {expanded ? "Show Less →" : "Read More →"}
        </button>
      </div>

      {/* JSON-LD for SEO */}
      <Script
        id={`blog-jsonld-${post.id}`}
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
