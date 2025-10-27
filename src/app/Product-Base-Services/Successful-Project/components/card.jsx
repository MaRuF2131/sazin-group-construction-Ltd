"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import Image from "next/image";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";

export default function Card() {
  const loadMoreRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const categories=["All","Civil","Electro","Engineering-Procurement","Safe&Security","NHA","PGCB","PWD","BPC", "EED", "LGED","Agro"];

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


  return (
    <div className="p-6 dark:bg-black py-20">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat,i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-md font-medium transition ${
              activeCategory === cat
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div ref={loadMoreRef} className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredData.map((project) => (
          <div
            key={project._id}
            className="rounded-xl shadow-sm hover:shadow-lg transition bg-white dark:bg-gray-900 flex flex-col items-center p-5"
          >
            {/* Image + Overlay */}
            <div className="relative w-full h-44 flex items-center justify-center overflow-hidden mb-4 group">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={300}
                height={200}
                className="max-h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay Button with Icon */}
              <Link
                href={`/Projects/${project._id}`}
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition"
              >
                <FaLink className="text-white text-3xl bg-red-600 p-2 rounded-full shadow-md hover:bg-red-700 transition" />
              </Link>
            </div>

            {/* Title */}
            <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-base sm:text-lg lg:text-xl mb-3 text-center leading-snug">
              {project.title}
            </h3>

            {/* Date + Category */}
            <div className="text-gray-500 text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
              <span>📅 {new Date(project.date).toLocaleDateString()}</span>
              <span>🏷 {project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}