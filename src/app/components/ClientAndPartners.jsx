"use client"
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";
import React, { useEffect, useRef, useState } from "react";
import { FaBuilding } from "react-icons/fa";


const ClientAndPartners = () => {
  const [clients,setclients]=useState([])
// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("client","","","")
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
       const value=data?.pages?.flatMap((page) => page?.data)|| [];
       setclients(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"clients"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"clients"} refetch={refetch}></ErrorCard>
  );
  return (
    <div className="bg-white dark:bg-neutral-950 py-16 px-4 lg:px-8 transition-colors duration-500">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-left text-gray-800 dark:text-white">
          Our <span className="text-red-600">Clients</span> & Partners
        </h2>
        <p className="text-left text-xl mt-2 text-neutral-600 dark:text-neutral-300">
          Trusted by government & leading organizations across Bangladesh.
        </p>

        {/* Cards */}
        <div ref={loadMoreRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client, idx) => {
            const Icon = FaBuilding;
            return (
              <div
                key={idx}
                className="group bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-[280px]"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-gray-200 mb-4">
                  <Icon className="text-red-600 text-3xl" />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {client?.partner}
                </h3>

                {/* Description (Fixed height, scrollable on hover) */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 overflow-hidden group-hover:overflow-auto transition-all duration-300 h-[60px]">
                  {client?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientAndPartners;