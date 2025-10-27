// File: components/Achievement.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";
import DynamicFetch from "@/utils/DynamicFetch";


export default function Achievement() {
  const [current, setCurrent] = useState(0);
  const [achievements,setachievements]=useState([])
  const total = achievements.length;
// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("achievement","","","")
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

  useEffect(()=>{
     if(data){
       const value=data?.pages?.flatMap((page) => page?.data).slice(0,4) || [];
       setachievements(value)
     } 
  },[data])

    // AutoPlay Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total); 
  const image="https://i.postimg.cc/RW2LdCPQ/pngtree-golden-achievement-unlocked-celebrating-your-success-on-a-blue-3d-background-image-3808269.jpg"
  const link="/award-detail" 
  
   const { achievement, description} = achievements[current]||[];
 if (status === 'pending')
    return (
      <Loader type={"achievements"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"achievements"} refetch={refetch}></ErrorCard>
  );


  return (
    <section
      ref={loadMoreRef}
      className="py-16 px-4 md:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-950"
      aria-label="Company achievements and awards"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 min-h-[480px] rounded-xl overflow-hidden shadow-md">
          {/* Left Side */}
          <div className="bg-white dark:bg-neutral-900 p-8 md:p-10 flex flex-col justify-between animate-fadeIn order-2 md:order-1">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Our <span className="text-red-500">Achievements</span>
              </h2>

              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 mt-3">
                {description}
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-red-600 mt-6 md:mt-8">
                {achievement}
              </h3>
              <Link
                prefetch={false}
                href={link}
                aria-label={`Read more about ${achievement}`}
                className="mt-2 inline-block text-red-600 font-medium hover:underline"
              >
                Read More →
              </Link>
            </div>

            {/* Navigation + Counter */}
            <div className="flex justify-between items-center mt-8 md:mt-10">
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  aria-label="Previous achievement"
                  className="p-2 md:p-3 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next achievement"
                  className="p-2 md:p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaArrowRight />
                </button>
              </div>
              <span
                className="text-sm md:text-lg font-medium text-neutral-500"
                aria-live="polite"
              >
                {current + 1}/{total}
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 mt-4 md:mt-6 relative overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <div
                key={current}
                className="absolute top-0 left-0 h-1 bg-red-500 animate-progress"
              />
            </div>
          </div>

          {/* Right Side (Image) */}
          <div className="bg-gray-200 dark:bg-gray-800 flex justify-center items-center p-6 md:p-8 animate-fadeIn order-1 md:order-2">
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-4 md:p-6 w-full max-w-md">
              <Image
                src={image}
                alt={`${achievement} - Achievement`}
                width={500}
                height={320}
                className="w-full h-[220px] md:h-[320px] object-contain rounded-lg"
                loading="lazy"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-progress {
          animation: progressFill 4s linear forwards;
        }
        @keyframes progressFill {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
