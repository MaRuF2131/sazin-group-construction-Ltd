"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import GalleryFilter from "@/app/project-gallery/components/GalleryFilter";
import DynamicFetch from "@/utils/DynamicFetch";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";


export default function ProjectShowcaseInfinity() {

    const router = useRouter();

  // Intersection Observer দিয়ে auto load
   const loadMoreRef = useRef(null);
   const [hoveredId, setHoveredId] = useState(null);
   const [activeCategory, setActiveCategory] = useState("All");
   const [filteredData, setFilteredData] = useState([]);
   const categories=["Civil","Electro","Engineering-Procurement","Safe&Security","NHA","PGCB","PWD","BPC", "EED", "LGED","Agro"];

   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("project","category",activeCategory,"")


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

 useEffect(()=>{
     const filtered = data?.pages?.flatMap((page) => page?.data) || []
     setFilteredData(filtered);
 },[activeCategory,data]) 


 if (status === 'pending')
    return (
      <Loader type={"projects"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"projects"} refetch={refetch}></ErrorCard>
  );

  // ✅ JSON-LD Structured Data
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (data?.pages.flatMap((p) => p.data) || []).map((p, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: p.title,
      image: p.imageUrl,
      datePublished: new Date(p.date).toLocaleString(),
      about: p.category,
      url: `https://sazin.com.bd/Projects/${p._id}`,
      author: {
        "@type": "Organization",
        name: "sazin construction ltd",
      },
    })),
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Our Projects | Sazin Construction Ltd.</title>
        <meta
          name="description"
          content="Explore our latest projects in web development, design, and technology. See case studies and portfolio highlights."
        />
        <meta
          name="keywords"
          content="projects, portfolio, web development, design, case studies"
        />
        <meta property="og:title" content="Our Projects | Sazin Construction Ltd." />
        <meta
          property="og:description"
          content="Discover high-quality projects crafted by our expert team."
        />
        <meta property="og:image" content="/default-project-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sazin.com.bd/projects" />
        <Script
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
      </Head>

      {/* ✅ UI untouched */}
      <section className="bg-neutral-50 dark:bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-10">
          Explore <span className="text-red-600">Our Projects</span>
        </h2>
        <GalleryFilter
            categories={categories}
            active={activeCategory}
            setActive={setActiveCategory}
          />
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredData.map((p) => (
              <div
                key={p._id}
                onPointerEnter={() => setHoveredId(p._id)}
                onPointerDown={() => setHoveredId(p._id)}
                onPointerUp={() => setHoveredId(p._id)}
                onPointerLeave={() => setHoveredId(p._id)} // 👉 phone এ কাজ করবে
                onPointerMove={() => setHoveredId(p._id)} // 👉 phone এ কাজ করবে
                onPointerOut={() => setHoveredId(null)} // 👉 phone এ কাজ করবে
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group"
              >
                <Image
                  src={p?.imageUrl}
                  alt={p?.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition duration-500 ${
                    hoveredId === p._id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-white text-lg font-semibold">
                    {p.title}
                  </span>
                  <p className="text-sm text-white mb-3">
                    {p.category} · {new Date(p.date).toLocaleString()}
                  </p>
                  <button
                    aria-label={`View details of ${p.title}`}
                    onClick={() => router.push(`/Projects/${p._id}`)}
                    className="px-3 cursor-pointer py-1.5 bg-red-600 text-white rounded-md hover:bg-red-900 hover:text-white transition"
                  >
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>

        {/* Loader / End message */}
        <div ref={loadMoreRef} className="text-center mt-8">
          {isFetchingNextPage && (
            <p className="text-gray-500">Loading more...</p>
          )}
          {!hasNextPage && (
            <p className="text-gray-400">All projects loaded ✅</p>
          )}
        </div>
      </section>
    </>
  );
}
