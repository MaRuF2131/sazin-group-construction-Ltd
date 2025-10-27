"use client";
import { useEffect, useRef } from "react";
import BlogCard from "./BlogCard";
import DynamicFetch from "@/utils/DynamicFetch";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";


export default function BlogList() {

 const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("news","","","")
const loadMoreRef = useRef();
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


 if (status === 'pending')
    return (
      <Loader type={"news"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"news"} refetch={refetch}></ErrorCard>
  );


  // ✅ JSON-LD for Blog + ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Our Latest Blog Posts",
    description: "Read the latest articles and insights from our blog.",
    blogPost:data?.pages.map((page)=>page?.data.map((post) => ({
      "@type": "BlogPosting",
      headline: post.newstitle,
      image: post.imageUrl,
      datePublished: new Date(post.date).toISOString(),
      author: {
        "@type": "Person",
        name: post.author,
      },
      description: post?.description.slice(0, 160),
    }))),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data?.pages.map((page)=>page?.data.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: `https://sazin.com.bd/news-blog`,
    }))),
  };

  return (
    <section
      className="flex flex-col items-center max-w-2xl mx-auto space-y-8"
    >

      {data?.pages.map((page) =>
        page.data.map((post) => <BlogCard key={post._id} post={post} />)
      )}

      {/* Loader trigger element */}
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && (
          <p className="text-center text-red-600">Loading more...</p>
        )}
        {!hasNextPage && (
          <p className="text-center text-base text-neutral-700 dark:text-neutral-300 mt-4">
            🎉 You have reached the end!
          </p>
        )}
      </div>

      {/* ✅ Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </section>
  );
}
