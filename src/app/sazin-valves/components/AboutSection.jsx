"use client"; // ডাটা ফেচ করতে হলে এটি "use client" থাকতে হবেই
import { aboutData as staticAboutData } from '../lib/data'
import { useState, useEffect } from "react";
export default function AboutSection() {
    const [aboutData, setAboutData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
  
    useEffect(() => {
      const fetchAbout = async () => {
        try {
          // ব্যাকএন্ডে থেকে ডাটা আনার চেষ্ট করা হচ্যেছে
          const res = await fetch('https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-about');
          
          if (res.status === 200) {
            const data = await res.json();
            console.log("res about",data);
            setAboutData(data?.data); // সফল হলে API এর ডাটা দিয়ে যাবে
          } else {
            // এররর হলে বা ডাউন হলে স্ট্যাটিক ডাটা দেখাবে
            setAboutData(staticAboutData); 
          }
        } catch (error) {
          console.error('Error fetching about data:', error);
          setAboutData(staticAboutData); // ডিফলট ডাটা দেখানো হবে
        } finally {
          setIsLoading(false); 
          // লোডিং শেষ হওয়েছে নিচের UI দেখাবে
        }
      };
  
      fetchAbout();
    }, []); // এই ফাক্লের কথাও দিলে শুধু একবার পেজ লোড হওয়ার সময়েই রাখলে একবার কলে দিলে একবার কলে দেওয়া না (Array dependency না দেওয়ারই করে একবার একবার ডেটা আসবে)
  
    // ডাটা आसले ना थाकले लोडिंग देखानोर जन्य एकटि फलब्याक देओया याते इউजारके "Loading..." देखाबे
  
    if (isLoading) {
      return (
        <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-brand-800">
          <div className="animate-pulse flex flex-col items-center gap-3">
            <div className="w-48 h-4 bg-white/20 rounded-full" />
            <span className="text-white/50 text-sm font-medium">Loading...</span>
          </div>
        </div>
        );
    }
  
    // ডাটা পেলে না থাকলেই এটি স্ট্যাটিক ডাটা দেখাবে
    if (!aboutData) return null;
  return (
    <section id="about" className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text */}
          <div>
            <span className="text-accent-500 dark:text-white text-[11px] font-semibold tracking-[0.2em] uppercase">
              Who We Are
            </span>
            <h2 className="font-heading dark:text-white text-3xl sm:text-4xl font-bold text-brand-700 mt-2 mb-6">
              {aboutData?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 text-[15px]">
              {aboutData?.description}
            </p>

            {/* Vision & Mission */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-700 p-6 border-l-4 border-accent-500 shadow-sm">
                <h4 className="font-heading text-xs font-bold text-brand-700 uppercase tracking-[0.15em] mb-2">
                  Our Vision
                </h4>
                <p className="text-sm text-gray-600 dark:text-white leading-relaxed">{aboutData?.vision}</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-6 border-l-4 border-brand-500 shadow-sm">
                <h4 className="font-heading text-xs font-bold text-brand-700 uppercase tracking-[0.15em] mb-2">
                  Our Mission
                </h4>
                <p className="text-sm text-gray-600 dark:text-white leading-relaxed">{aboutData?.mission}</p>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 flex items-center justify-center overflow-hidden relative">
              {/* Decorative circles */}
              <div className="absolute w-64 h-64 border border-white/5 rounded-full" />
              <div className="absolute w-40 h-40 border border-white/5 rounded-full" />

              <div className="relative text-center text-white p-8">
                <div className="text-8xl mb-5">🏭</div>
                <h3 className="font-heading text-3xl font-bold mb-2 tracking-wide">SAZIN Group</h3>
                <p className="text-brand-200 text-sm">Innovative Industries Ltd.</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 border border-white/10">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="text-xs text-brand-200">www.sazin.com.bd</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-accent-500 text-white p-6 shadow-xl">
              <div className="font-heading text-4xl font-bold leading-none">10+</div>
              <div className="text-[10px] tracking-[0.15em] uppercase mt-1 text-accent-100">
                Years
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}