"use client";
import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "./CategoryCard";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";

const Category = () => {
  const [categories, setCategories] = useState([]);
// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("product/category","","","")
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
       const value=data?.pages?.flatMap((page) => page?.data) || [];
       setCategories(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"categories"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"categories"} refetch={refetch}></ErrorCard>
  );

    if (!categories.length)
    return (
      <p className="text-center text-red-600 text-sm md:text-base">
        Categories not found
      </p>
    );

  return (
    <div className="p-6">
      <CategoryCard loadMoreRef={loadMoreRef} subCategories={categories} />
    </div>
  );
};

export default Category;
