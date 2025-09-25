"use client";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";


const HelmetAndSafetyCard = ({ data }) => {
     console.log(data);
     
  return (

  <>
      {/* 📦 Cards Grid */}
      <div className="grid w-full gap-4 grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center ">
            {(data || []).map((item, index) => (
              <div
                key={index}
                className="max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform duration-300 hover:shadow-2xl hover:scale-105"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {item?.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {item?.subtitle}
                  </p>

                  {/* Extra Description */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {item?.description}
                  </p>

                  {/* User-Friendly Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" /> {item?.rating || 4.5}
                    </span>
                    <span>
                      {item?.stock > 0 ? (
                        <span className="text-green-600 dark:text-green-400">In Stock</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Out of Stock</span>
                      )}
                    </span>
                    <span className="italic">#{item?.category}</span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default HelmetAndSafetyCard;
