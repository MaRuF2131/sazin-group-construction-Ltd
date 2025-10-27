"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { FaRegBuilding } from "react-icons/fa";
import { MdBusinessCenter, MdOutlineLocalFireDepartment, MdVerifiedUser } from "react-icons/md";
import { BiReceipt } from "react-icons/bi";
import { FaRegFileAlt } from "react-icons/fa";
import ErrorCard from "@/components/ErrorCard";
import Loader from "@/components/Loader";
import DynamicFetch from "@/utils/DynamicFetch";

/* const certificates = [
  { name: "Incorporation Certificate", image: "/certificates.jpeg", icon: FaRegBuilding, animation: { rotate: 15 } },
  { name: "Trade License", image: "/certificates.jpeg", icon: MdBusinessCenter, animation: { scale: 1.2 } },
  { name: "VAT Registration", image: "/certificates.jpeg", icon: BiReceipt, animation: { rotate: -15 } },
  { name: "Income Tax Certificate", image: "/certificates.jpeg", icon: FaRegFileAlt, animation: { scale: 1.15 } },
  { name: "Fire Safety License", image: "/certificates.jpeg", icon: MdOutlineLocalFireDepartment, animation: { rotate: 20 } },
  { name: "Authorized License", image: "/certificates.jpeg", icon: MdVerifiedUser, animation: { scale: 1.2 } },
]; */

export default function MotionCertificates() {
  const [selectedImage, setSelectedImage] = useState(null);

    const [certificates,setcertificates]=useState([])

// access feature project
   const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("certificate","","","")
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
       setcertificates(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"certificates"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"certificates"} refetch={refetch}></ErrorCard>
  );

  return (
    <div ref={loadMoreRef} className="mt-10 container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {certificates.map((cert, i) => {
        const Icon = MdBusinessCenter;
        return (
          <motion.div
            key={i}
            className="bg-red-600 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg flex items-center gap-4"
            onClick={() => setSelectedImage(cert.imageUrl)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="text-white text-4xl"
              whileHover={cert.animation}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon />
            </motion.div>

            <p className="font-medium text-white dark:text-gray-200 text-lg">
              {cert.certificateName}
            </p>
          </motion.div>
        );
      })}

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed top-20 inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-neutral-900 p-4 rounded-lg max-w-4xl w-[95%] md:h-[90%] h-[70%]  flex flex-col"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Responsive Image */}
              <div className="flex-1 relative w-full">
                <Image
                  src={selectedImage}
                  alt="Certificate"
                  fill
                  className="object-fill w-full rounded-md"
                  priority={false}
                />
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="mt-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition self-center"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
