// ./components/Hero.jsx
"use client";
import React from "react";

export default function Hero({ data }) {
  return (
    <section
      className="relative -mt-25 w-full bg-cover bg-center min-h-[70vh] md:min-h-[80vh] lg:min-h-[100vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(2,6,23,0.45), rgba(2,6,23,0.25)), url(${data.heroImage})`,
      }}
      aria-label={`${data.name} hero`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
        <div className="max-w-3xl text-white">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              {/* simple logo placeholder */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" fill="currentColor" opacity="0.15"/>
                <path d="M8 12a4 4 0 018 0" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="text-lg md:text-xl font-semibold">{data.name}</h4>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Sustainable Farming & Responsible Fisheries
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6">
           11 ponds, approximately {data.pondArea} of pond area, and around {data.agriLand} of agricultural land — we practice technology-driven, eco-friendly production methods.

          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#facilities"
              className="inline-flex items-center gap-2 hover:bg-green-700 border border-white/40 text-white px-4 py-2 rounded-md text-sm md:text-base shadow"
            >
              Explore Facilities
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 hover:bg-green-700 border border-white/40 text-white px-4 py-2 rounded-md text-sm md:text-base"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}