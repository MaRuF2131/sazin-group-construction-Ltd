"use client";
import Image from "next/image";
import React from "react";
import { FaStar, FaTag } from "react-icons/fa";

const HelmetAndSafetyCard = ({ data }) => {
  // Helper function for random number
  const getRandom = (min, max, decimals = 1) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

  return (
    <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
      {(data || []).map((item, index) => {
        // Assign fallback values
        const rating = item?.rating || getRandom(3.5, 4.5);
        const price = item?.price || getRandom(500, 5000, 0);

        return (
          <div
            key={index}
            className="relative max-w-sm w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
          >
            {/* ⭐ Featured Badge */}
            {item?.isFeatured && (
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Featured
              </div>
            )}

            {/* 💸 Discount Badge */}
            {item?.hasDiscount && (
              <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-red-600 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <FaTag className="w-3 h-3" /> -{item.discountPercent || 0}%
              </div>
            )}

            {/* 🖼 Image */}
            <div className="overflow-hidden relative">
              <Image
                src={item?.imageUrl || "/placeholder.jpg"}
                alt={item?.title || "Product Image"}
                width={400}
                height={300}
                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* 🧾 Content */}
            <div className="p-5 space-y-3">
              {/* Product Title */}
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-snug">
                <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                  {item?.productName || "Untitled Product"}
                </span>
              </h2>

              {/* 🎨 Subtitle */}
              {item?.title && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <p className="text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400 uppercase">
                    {item?.title}
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {item?.description || "No description available."}
              </p>

              {/* Info Section */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 pt-2">
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" /> {rating}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ৳{price.toLocaleString()}
                </span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                  #{item?.category || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HelmetAndSafetyCard;
