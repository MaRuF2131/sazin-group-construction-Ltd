'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import DynamicFetch from '@/utils/DynamicFetch';
import Loader from '@/components/Loader';
import ErrorCard from '@/components/ErrorCard';


export default function FeatureProducts() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef(null);

  const [products,setproducts]=useState([])

// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("product","","",true)
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
       const value=data?.pages?.flatMap((page) => page?.data).slice(0,21) || [];
       setproducts(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"products"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"products"} refetch={refetch}></ErrorCard>
  );

  return (
    <section ref={loadMoreRef} className="py-14 bg-white dark:bg-neutral-950 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <h2 className="text-left text-3xl text-gray-900 font-semi-bold mb-2 dark:text-white">
          Featured <span className="text-red-500">Products</span>
        </h2>
        <p className="text-left mb-6 text-xl text-gray-600 dark:text-gray-400">
          Stands for sustainable luxury products
        </p>

      {products.length > 0 &&  <Swiper
          modules={[Navigation, Autoplay, Grid]}
          spaceBetween={20}
          slidesPerView={1} // Default, overridden by breakpoints
          grid={{ rows: 2, fill: 'row' }}
          loop={true}
          speed={800} // Smoother transition
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex + 2)}
          breakpoints={{
            640: { slidesPerView: 2, grid: { rows: 2 } },
            1024: { slidesPerView: 3, grid: { rows: 2 } },
            1280: { slidesPerView: 4, grid: { rows: 2 } },
          }}
          onPointerEnter={() => swiperRef.current?.autoplay.stop()}
          onPointerLeave={() => swiperRef.current?.autoplay.start()}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-40">
                  <Image
                    src={product?.imageUrl}
                    alt={product?.productName}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-500 dark:text-white">
                    {product?.productName}
                  </h3>
                  <h3 className="text-base font-bold dark:text-white">
                    {product?.title}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
   }

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4 pt-3">
            <button className="custom-prev text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition">
              ←
            </button>
            <button className="custom-next text-xl border border-red-500 text-red-500 w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white transition">
              →
            </button>

            <Link
              prefetch={false}
              href="/Product-Base-Services/Sky-Helmet&Safety-Accessories"
              className="text-red-600 text-xl hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="font-semibold">
            <span className="text-red-600 text-xl">{currentIndex}</span>
            <span className="text-gray-500 text-xl">/{products.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
