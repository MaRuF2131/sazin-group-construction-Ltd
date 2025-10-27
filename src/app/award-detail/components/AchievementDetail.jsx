// AchievementDetail.jsx
'use client';
import ErrorCard from '@/components/ErrorCard';
import Loader from '@/components/Loader';
import DynamicFetch from '@/utils/DynamicFetch';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  FaAward,
  FaBuilding,
  FaChartLine,
  FaHardHat,
  FaTrophy,
  FaUsers,
} from 'react-icons/fa';

export default function AchievementDetail() {
/*   const achievements = [
    {
      icon: <FaHardHat className="text-2xl text-red-600 dark:text-red-400" />,
      title: 'Rooppur Nuclear Power Plant Project',
      desc: "Successfully executed critical housing and infrastructure works for Bangladesh's premier nuclear power facility, demonstrating our technical expertise in large-scale projects.",
    },
    {
      icon: <FaAward className="text-2xl text-red-600 dark:text-red-400" />,
      title: 'Government Trusted Partner',
      desc: 'Enlisted with multiple government departments including PWD, Bangladesh Petroleum Corporation, and other key agencies, reflecting our reliability and quality standards.',
    },
    {
      icon: <FaTrophy className="text-2xl text-red-600 dark:text-red-400" />,
      title: 'Technical Excellence',
      desc: 'Recognized for expertise in Electro-Mechanical works, Fire Protection Systems, and complex engineering solutions across diverse project types.',
    },
    {
      icon: <FaUsers className="text-2xl text-red-600 dark:text-red-400" />,
      title: 'Sustainable Growth',
      desc: 'Maintained consistent financial performance with over 1156 crore BDT total turnover in the last five years, demonstrating business stability and growth.',
    },
  ]; */

   const [achievements,setachievements]=useState([])
  // access feature project
     const  {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      status,
      refetch
    }=DynamicFetch("achievement","","","")
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
         setachievements(value)
       } 
    },[data])

 
   if (status === 'pending')
      return (
        <Loader type={"achievements"}></Loader>
      );
  
    if (status === "error") return (
        <ErrorCard type={"achievements"} refetch={refetch}></ErrorCard>
    );
  
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1465433045946-ba6506ce5a59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-gray-900/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="md:text-5xl text-4xl font-bold mb-4">Milestones & Achievements</h1>
          <p className="md:text-xl text-lg max-w-3xl mx-auto">
            Celebrating Excellence in Construction and Engineering
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 border-b px-6 py-3 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link
            href="/"
            prefetch={false}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300">Achievements</span>
        </div>
      </nav>

      {/* Stats Section */}
      <div className="bg-red-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <FaBuilding className="text-4xl mx-auto mb-4" />,
              value: '94+',
              label: 'Projects Completed',
            },
            {
              icon: <FaChartLine className="text-4xl mx-auto mb-4" />,
              value: '200+',
              label: 'Crore BDT Annual Turnover',
            },
            {
              icon: <FaUsers className="text-4xl mx-auto mb-4" />,
              value: '15+',
              label: 'Years of Experience',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-red-700/30 rounded-lg backdrop-blur-sm"
            >
              {stat.icon}
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Our Key Achievements
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
            Our journey is marked by significant milestones that reflect our
            commitment to excellence, innovation, and client satisfaction.
          </p>
        </div>

        {/* Achievement Cards */}
        <div ref={loadMoreRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-red-600 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start mb-6">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
                  <FaHardHat className="text-2xl text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    {item?.achievement}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Our Commitment to Excellence
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            At Sazin Construction Ltd., our greatest achievement is the trust of
            our clients and our contribution to Bangladesh's infrastructure
            development. Since 2007, we have been committed to delivering
            quality, innovation, and value in every project we undertake.
          </p>
          <Link
            prefetch={false}
            href="/Projects"
            aria-label="Explore our past and ongoing projects"
            className="border border-red-500 text-red-600 px-6 py-3 rounded-lg font-semibold text-base hover:bg-red-500 hover:text-white transition transform hover:scale-105"
          >
            View Our Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
