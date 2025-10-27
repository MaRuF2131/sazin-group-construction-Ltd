"use client";
import { useState, useEffect, useRef } from "react";
import GalleryCard from "./GalleryCard";
import GalleryFilter from "./GalleryFilter";
import GalleryLightbox from "./GalleryLightbox";
import DynamicFetch from "@/utils/DynamicFetch";
import { Loader } from "lucide-react";
import ErrorCard from "@/components/ErrorCard";



export default function GalleryList() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const loadMoreRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [currentIndex,setCurrentIndex]=useState(null)

 const categories=["Civil","Electro","Engineering-Procurement","Safe&Security","NHA","PGCB","PWD","Agro"];

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

  useEffect(()=>{
     // lightbox navigation
  const currentIndex = filteredData.findIndex((p) => p._id === lightbox?._id);
  setCurrentIndex(currentIndex);
 },[filteredData,lightbox])


  const handlePrev = () =>
    setLightbox(filteredData[(currentIndex - 1 + filteredData.length) % filteredData.length]);
  const handleNext = () =>
    setLightbox(filteredData[(currentIndex + 1) % filteredData.length]);


 if (status === 'pending')
    return (
      <Loader type={"projects"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"projects"} refetch={refetch}></ErrorCard>
  );


  return (
    <div>
      <GalleryFilter
        categories={categories}
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredData.map((p) => (
          <GalleryCard key={p._id} project={p} onClick={setLightbox} hoveredId={hoveredId}
           setHoveredId={setHoveredId} />
        ))}
      </div>

      <div ref={loadMoreRef} className="h-12 flex justify-center items-center">
        {isFetchingNextPage && <p className="text-red-600">Loading more...</p>}
        {!hasNextPage && <p className="text-gray-600 text-base pt-5 dark:text-gray-200">🎉 End of Gallery</p>}
      </div>

      <GalleryLightbox
        project={lightbox}
        onClose={() => setLightbox(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
