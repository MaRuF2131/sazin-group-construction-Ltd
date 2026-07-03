"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "../lib/data";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([products || []]);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ করার লজিক
  useEffect(() => {
    setAllProducts(products || []); // window.products থেকে প্রোডাক্ট লোড করুন
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // সার্চ লজিক (Debounced - ৩০০ মিলিসেকেন্ড পর রেজাল্ট আনবে)
  useEffect(() => {
    // ইনপুট খালি থাকলে ড্রপডাউন বন্ধ রাখুন
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // টাইপিং শেষ হওয়ার ৩০০ms পর সার্চ করুন
    const delayDebounceFn = setTimeout(() => {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    }, 300);

    // ইউজার নতুন করে টাইপ করলে আগের টাইমার ক্যান্সেল করুন
    return () => clearTimeout(delayDebounceFn);
  }, [query, allProducts]);

  return (
    <div ref={dropdownRef} className="relative w-full px-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)} // আবার ক্লিক করলে ওপেন হবে
          placeholder="Search products..."
          className="w-full placeholder:text-black dark:placeholder:text-white   border border-gray-200 dark:text-white text-black  text-sm rounded-xl px-4 py-3 pr-10 focus:outline-none    transition-all"
        />
        {/* Search Icon */}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-white text-black "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Dropdown Results Area */}
      {isOpen && (
        <div className="absolute dark:bg-gray-800 bg-gray-400 top-full mt-2 right-4 left-4  rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[350px] overflow-y-auto">
          
          {/* যদি রেজাল্ট পাওয়া যায় */}
          {results.length > 0 ? (
            <ul>
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/sazin-valves/products/${product.slug}`}
                    onClick={() => setIsOpen(false)} // লিংকে ক্লিক করলে ড্রপডাউন বন্ধ হওয়ার জন্য
                    className="flex items-center gap-4 px-4 py-3 dark:hover:bg-gray-400 hover:bg-gray-800 transition-colors duration-150 border-b border-gray-50 last:border-0"
                  >
                    {/* প্রোডাক্ট ইমেজ বা ইমোজি */}
                    <div className="w-12 h-12  rounded-lg flex items-center justify-center text-2xl shrink-0 overflow-hidden border border-gray-200">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{product.emoji || "📦"}</span>
                      )}
                    </div>
                    
                    {/* প্রোডাক্ট নাম */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {product.name}
                      </p>
                      {product.shortDesc && (
                        <p className="text-xs text-white truncate mt-0.5">
                          {product.shortDesc}
                        </p>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            /* যদি কোনো রেজাল্ট না পাওয়া যায় */
            <div className="px-4 py-8 text-center">
              <p className="dark:text-gray-200 text-gray-600 text-sm">No products found for</p>
              <p className="dark:text-gray-200 text-gray-600 font-semibold mt-1">"{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}