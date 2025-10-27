'use client'; // ⚠️ সবথেকে উপরে

import ErrorCard from '@/components/ErrorCard';
import Loader from '@/components/Loader';
import DynamicFetch from '@/utils/DynamicFetch';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';


export const metadata = {
  title: 'Our Equipment & Capabilities | Your Company',
  description:
    'Modern construction equipment ensures timely, safe, and high-quality project execution.',
  openGraph: {
    title: 'Our Equipment & Capabilities',
    description:
      'Modern construction equipment ensures timely, safe, and high-quality project execution.',
    images: ['/equipment-og.jpg'],
  },
};

export default function Equipment() {
 const [equipment,setequipment]=useState([])
// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("equipment","","","")
const loadMoreRef = useRef();
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage ) {      
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
       const value=data?.pages?.flatMap((page) => page?.data).slice(0,6) || [];
       setequipment(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"equipments"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"equipments"} refetch={refetch}></ErrorCard>
  );
  return (
    <section ref={loadMoreRef} className="bg-neutral-50 dark:bg-neutral-950 py-16 px-6 lg:px-8 transition-colors duration-500">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-left dark:text-white">
          Our <span className="text-red-500">Equipment</span> & Capabilities
        </h2>
        <p className="text-left mt-2 text-xl text-neutral-600 dark:text-neutral-300">
          Modern equipment ensures timely and safe execution.
        </p>

        {/* Equipment List */}
        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          {equipment.map((item, index) => (
            <li
              key={index}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700
              p-6 rounded-xl shadow-sm hover:shadow-lg transition font-semibold text-neutral-800 dark:text-neutral-200"
            >
              {item?.equipment}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/equipment"
            className="text-red-600 text-left text-xl hover:underline transition"
            aria-label="View all equipment and capabilities"
          >
            View All Equipment →
          </Link>
        </div>
      </div>
    </section>
  );
}
