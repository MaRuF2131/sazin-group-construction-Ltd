"use client";

import { useState, useEffect } from "react";

export default function Services({ children }) {
  // সব ডাটা রাখার জন্য একটি স্টেট
  const [data, setData] = useState({
    hero: null,
    about: null,
    strengths: null,
    valves: { data: [], currentPage: 1, totalPages: 1, totalItems: 0 },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setIsLoading(true);

        // সব API একসাথে প্যারালালে কল করা হচ্ছে যাতে লোডিং দ্রুত হয়
        const [heroRes, aboutRes, strengthsRes, valvesRes] = await Promise.all([
          fetch('https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-hero'),
          fetch('https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-about'),
          fetch('https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-strengths'),
          fetch('https://sazin-group-construction-ltd-backen-iota.vercel.app/userAction/sazin-valves/get-valves?limit=10') // নরমাল ইউজারের জন্য ১০টি প্রোডাক্ট
        ]);

        // রেসপন্স থেকে JSON পার্স করা
        const hero = await heroRes.json();
        const aboutRaw = await aboutRes.json();
        const strengths = await strengthsRes.json();
        const valves = await valvesRes.json();

        // স্টেট আপডেট করা 
        // খেয়াল করুন: About এর ডাটা ব্যাকএন্ডে { data: {...} } আকারে আসে, তাই আমরা .data ধরে নিচ্ছি
        setData({
          hero: hero,
          about: aboutRaw.data, 
          strengths,
          valves
        });

      } catch (err) {
        console.error("Error fetching services data:", err);
        setError("Failed to load service data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  // ১. লোডিং দেখানোর জন্য একটি সুন্দর স্কেলেটন
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* হিরো স্কেলিটন */}
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-3/4 mb-8" />
          <div className="h-6 bg-gray-200 animate-pulse rounded-lg w-1/2 mb-12" />
          
          {/* কন্টেন্ট গ্রিড স্কেলিটন */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm space-y-4 animate-pulse">
                <div className="h-40 bg-gray-200 rounded-lg" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ২. এরর হ্যান্ডেল করা
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-red-100 max-w-md">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Oops!</h3>
          <p className="text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // ৩. সব ঠিক থাকলে children কে ডাটা পাঠিয়ে দেওয়া হবে
  return children({ ...data });
}