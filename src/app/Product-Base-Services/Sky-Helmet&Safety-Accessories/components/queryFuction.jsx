'use client'
import HelmetAndSafetyCard from './HelmetAndSafetyCard'
import React, { useRef, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Loader from '@/components/Loader';
import ErrorCard from '@/components/ErrorCard';
import DynamicFetch from '../../../../utils/DynamicFetch';
 const ct=[
        "All",
        "Welding Helmets & Gloves",
        "Fall Protection Harness",
        "Coveralls / Suits",
        "Respirators / Masks",
        "High-Visibility Safety Vests",
        "Safety Shoes / Gumboots",
        "Safety Gloves",
        "Ear Plugs / Ear Muffs",
        "Safety Goggles / Face Shields",
        "Safety Helmets (Hard Hats)",
        "Half Face",
        "Open Face",
        "Modular Face",
        "Full Face"
    ]

export default function QueryFunction({value ,ky}) {
  const[mainData,setMainData]=useState([]);
  const [query,setQuery] = useState(value);
  const [search, setSearch] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [sort, setSort] = useState("none");

// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("product","category",query,'')
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

  useEffect(() => {
  setQuery(value);
}, [value, ky]); 

  useEffect(()=>{
      setSort("none");
      setFilterPrice("all");
      setSearch("");
  },[query])


  
  // Filtering & Sorting Logic
  const filterAndSortData = () => {
    let filtered = data?.pages?.map(page => page?.data || []).flat() || [];
    if(filtered.length<=0){setMainData([]); return ;}
    if (search) {
      filtered = filtered.filter((item) =>
        item?.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }


    if (filterPrice === "low") {
      filtered = filtered.filter((item) => item?.price < 1000);
    } else if (filterPrice === "high") {
      filtered = filtered.filter((item) => item?.price >= 1000);
    }

    if (sort === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price) || [];
    } else if (sort === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price) || [];
    }
    setMainData(filtered);
  };

  useEffect(() => {
     filterAndSortData();
  }, [search,filterPrice,sort,data]);


  return (
  <div className="container mx-auto w-full md:p-8 p-4">
      {/* 🔍 Search + Filter + Sort Controls */}
      <div className="flex flex-col  items-center justify-between gap-3 mb-6">
        <div className="relative w-full ">
          <FiSearch
            className="absolute left-3 top-3 text-gray-500 dark:text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            {ct.map((cat,indx)=>(
              <option key={indx} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            <option value="all">All Prices</option>
            <option value="low">Below 1000</option>
            <option value="high">1000 & Above</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-red-800 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            <option value="none">Sort by</option>
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      </div>

         {status === 'pending' && (
           <Loader type={"products"}></Loader>
          )}

         {status === "error" && (
           <ErrorCard type={"products"} refetch={refetch}></ErrorCard>
         )}
        {mainData.length > 0   && <HelmetAndSafetyCard data={mainData} />}
  
      {/* Sentinel element for IntersectionObserver */}
      <div ref={loadMoreRef} className=" w-full z-[999]  h-10 mt-5 text-center">
        {isFetchingNextPage && <p className='text-red-500'>Loading more...</p>}
        {!hasNextPage && <p className="text-gray-900 text-xl font-semi-bold dark:text-white">No more products</p>}
      </div>
    </div>
  );
}
