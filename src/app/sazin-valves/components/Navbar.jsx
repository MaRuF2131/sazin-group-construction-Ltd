"use client";

import { useState } from "react";
import Link from "next/link";
import ProductSearch from "./ProductSearch";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* টপ বার - শুধুমাত্র টগল আইকন থাকবে (লোগো লুকানো) */}
      <header className=" fixed top-25 right-0 z-50 bg-transparent backdrop-blur-md shadow-lg h-10 w-10">
        <div className="flex items-center justify-between h-full">
          {/* বাম পাশে শুধু আইকন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black dark:text-white cursor-pointer p-1.5 hover:bg-brand-600 rounded-md transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              // Close (X) Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ব্যাকড্রপ - পেছনের অংশ কালো করবে */}
{/*       {isOpen && (
        <div 
          className="fixed top-26 bg-black z-40 transition-opacity"
          onClick={closeSidebar}
        ></div>
      )} */}

      {/* সাইডবার - ফুল স্ক্রিন না, বরং নির্দিষ্ট প্রস্থের (w-72) বাম পাশ থেকে ওপেন হবে */}
      <div
        className={`fixed top-24 left-0 bottom-0 h-[calc(100vh-6rem)] w-72 dark:bg-black bg-white border-r border-brand-600 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-4 flex flex-col h-full">
          
          {/* লোগো - এখন সাইডবারের ভিতরে আছে */}
{/*           <Link href="/" className="flex items-center gap-3 mb-6" onClick={closeSidebar}>
            <div className="w-9 h-9 bg-accent-500 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-5 h-5 text-white">
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="2" />
                <rect x="16" y="20" width="16" height="8" rx="1" fill="currentColor" opacity="0.3" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-heading text-lg font-bold tracking-wider uppercase leading-none">
                SAZIN
              </span>
              <span className="text-brand-300 text-[9px] tracking-[0.15em] uppercase leading-none mt-0.5">
                Innovative Industries
              </span>
            </div>
          </Link> */}

          {/* সার্চ বার */}
          <ProductSearch></ProductSearch>

          {/* নেভিগেশন লিংক */}
          <nav className="flex flex-col gap-1 flex-grow">
            <Link
              href="/sazin-valves"
              onClick={closeSidebar}
              className="block px-4 py-3 dark:text-white hover:bg-brand-700 hover:text-white text-sm rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sazin-valves/products"
              onClick={closeSidebar}
              className="block px-4 py-3 dark:text-white hover:bg-brand-700 hover:text-white text-sm rounded-md transition-colors"
            >
              Products
            </Link>
          </nav>
          
        </div>
      </div>
    </>
  );
}