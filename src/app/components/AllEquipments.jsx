"use client"
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";
import { useEffect, useRef, useState } from "react";
import { FaTools } from "react-icons/fa";


const AllEquipments = () => {

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
       const value=data?.pages?.flatMap((page) => page?.data) || [];
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
    <div className="bg-white dark:bg-neutral-950 py-16 px-4 lg:px-8 transition-colors duration-500">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-left text-gray-800 dark:text-white">
          Our <span className="text-red-600">Equipment</span> & Capabilities
        </h2>
        <p className="text-left text-xl mt-2 text-neutral-600 dark:text-neutral-300">
          Empowering projects with modern equipment and strong technical expertise.
        </p>

        {/* Cards */}
        <div ref={loadMoreRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {equipment.map((item, idx) => {
            const Icon = FaTools;
            return (
              <div
                key={idx}
                className="group bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 dark:bg-gray-200 mb-4">
                  <Icon className="text-red-600 text-3xl" />
                </div>

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item?.equipment}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {item?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllEquipments;
