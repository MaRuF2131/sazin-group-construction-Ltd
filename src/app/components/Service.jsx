"use client";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";

const services = [
  {
    title: "Civil Construction & EPC",
    desc: "Residential, commercial & industrial projects with end-to-end delivery.",
  },
  {
    title: "Electro-Mechanical Works",
    desc: "Power systems, substations, fire protection & automation.",
  },
  { 
    title: "Agro & Fisheries", 
    desc: "Supporting sustainable agriculture and fisheries industries." 
  },
  { 
    title: "Helmet & Safety Accessories", 
    desc: "Providing high-quality helmets and safety gear." 
  },
  {
    title: "IT & Automation",
    desc: "Networking, CCTV, access control & system integration.",
  },
  {
    title: "Fire Protection & Safety",
    desc: "Detection, suppression and prevention systems.",
  },
  {
    title: "Logistics & Supply",
    desc: "Equipment, spare parts, and reliable project support.",
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef(null);

const [services,setservices]=useState([])

// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("service","","","")
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
       setservices(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"services"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"services"} refetch={refetch}></ErrorCard>
  );

  return (
    <section ref={loadMoreRef} className="bg-neutral-50 dark:bg-neutral-950 py-16 px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-semi-bold text-left dark:text-white">
          Our <span className="text-red-500">Services</span>
        </h2>
        <p className="text-left text-lg mt-2 text-neutral-600 dark:text-neutral-300">
          From design to delivery, we provide end-to-end solutions.
        </p>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 1)}
          className="mt-10 pb-12"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          aria-live="polite"
        >
          {services.map((service, i) => (
            <SwiperSlide key={i}>
              <article
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-6 rounded-xl shadow-sm hover:shadow-lg transition h-full"
                role="group"
                aria-label={service.service}
              >
                <h3 className="text-lg font-semibold text-red-600">{service.service}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {service.description}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Footer (Prev/Next + Counter) */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <button
              className="custom-prev text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              className="custom-next text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
              aria-label="Next slide"
            >
              →
            </button>
          </div>

          <div className="font-semibold">
            <span className="text-red-600 text-xl">{currentIndex}</span>
            <span className="text-gray-500 text-xl">/{services.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
