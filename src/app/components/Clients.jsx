// Clients.jsx
'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { FaBuilding } from 'react-icons/fa';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loader from '@/components/Loader';
import ErrorCard from '@/components/ErrorCard';
import DynamicFetch from '@/utils/DynamicFetch';


export const metadata = {
  title: 'Our Clients & Partners | Your Company',
  description:
    'Trusted by government & leading organizations across Bangladesh.',
  openGraph: {
    title: 'Our Clients & Partners',
    description:
      'Trusted by government & leading organizations across Bangladesh.',
    images: ['/clients-og.jpg'],
  },
};

export default function Clients() {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

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
       const value=data?.pages?.flatMap((page) => page?.data).slice(0,7) || [];
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

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex + 1);
  };

  return (
    <section ref={loadMoreRef} className="bg-white dark:bg-neutral-950 py-16 px-4 lg:px-8 transition-colors duration-500">
      <div className="container mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-left text-gray-800 dark:text-white">
          Our <span className="text-red-600">Clients</span> & Partners
        </h2>
        <p className="text-left text-xl mt-2 text-neutral-600 dark:text-neutral-300">
          Trusted by government & leading organizations across Bangladesh.
        </p>

        {/* Swiper Slider */}
        <div className="mt-10">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={false} // remove default arrows
          >
            {clients.map((client, i) => {
              const Icon = FaBuilding;
              return (
                <SwiperSlide key={i}>
                  <motion.div
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg shadow-sm hover:shadow-lg transition flex items-center gap-4 h-24 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="text-red-500 dark:text-red-400 text-3xl"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon aria-label={client.partner + ' logo'} />
                    </motion.div>

                    {/* Text */}
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {client.partner}
                    </p>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Controls below cards */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
              aria-label="Previous slide"
            >
              <BsArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition"
              aria-label="Next slide"
            >
              <BsArrowRight />
            </button>
            <Link
              href="/clients"
              prefetch={false}
              className="text-red-600 text-left text-xl hover:underline transition"
              aria-label="View all clients and partners"
            >
              See All →
            </Link>
          </div>

          <div className="font-semibold text-xl">
            <span className="text-red-600">{currentIndex}</span>
            <span className="text-gray-500">/{clients.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
