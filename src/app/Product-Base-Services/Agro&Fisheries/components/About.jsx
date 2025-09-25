// ./components/About.jsx
"use client";
import React from "react";

export default function About() {
  return (
    <section className="py-16 bg-slate-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-semibold text-green-600 mb-4">
            About Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            At <span className="font-semibold">Sazin Agro & Fisheries</span>, we are
            dedicated to sustainable farming with modern and eco-friendly practices.  
            Our resources include:
          </p>

          <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5">
            <li>
              Total <span className="font-semibold">11 ponds</span> covering around{" "}
              <span className="font-semibold">≈ 80 Bigha</span>
            </li>
            <li>
              Agricultural land of approximately{" "}
              <span className="font-semibold">≈ 75 Bigha</span>
            </li>
            <li>
              <span className="font-semibold">3 mango orchards</span> with nearly{" "}
              <span className="font-semibold">1100 trees</span>
            </li>
            <li>
              <span className="font-semibold">Lemon garden</span> with about{" "}
              <span className="font-semibold">500 trees</span>
            </li>
            <li>
              <span className="font-semibold">Banana plantation</span> of around{" "}
              <span className="font-semibold">500–600 trees</span>
            </li>
          </ul>
        </div>

        {/* Right Video */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="/video.mp4"
            title="About Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}