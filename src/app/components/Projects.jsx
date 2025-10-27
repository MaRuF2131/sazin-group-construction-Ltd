"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; // Lazy removed

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import DynamicFetch from "@/utils/DynamicFetch";
import { FaInfoCircle } from "react-icons/fa";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";


export default function Projects() {


  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef(null);
  const [projects,setprojects]=useState([])

// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("project","category","All",true)
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
       const value=data?.pages?.flatMap((page) => page?.data).slice(0,6) || [];
       setprojects(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"projects"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"projects"} refetch={refetch}></ErrorCard>
  );

  return (
    <>
    <section ref={loadMoreRef} className="bg-white dark:bg-neutral-950 py-16 px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semi-bold text-left dark:text-white">
          Featured <span className="text-red-600">Projects</span>
        </h2>
        <p className="text-left mt-2 text-xl font-semi-bold text-neutral-600 dark:text-neutral-300">
          Landmark projects across Bangladesh.
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}// prevent all images loading at once
          lazy='true'          // enable lazy load without Lazy module import
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-10 pb-12"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition">
                <div className="relative w-full h-48">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 text-center font-semibold dark:text-white">
                  {p.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <button className="custom-prev text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition">
              ←
            </button>
            <button className="custom-next text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition">
              →
            </button>

            <Link
              href="/Projects"
              prefetch={false}
              className="text-red-600 text-xl hover:underline transition"
            >
              View All 
            </Link>
          </div>

          <div className="font-semibold ml-2">
            <span className="text-red-600 text-xl">{currentIndex}</span>
            <span className="text-gray-500 text-xl">/{projects.length}</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
