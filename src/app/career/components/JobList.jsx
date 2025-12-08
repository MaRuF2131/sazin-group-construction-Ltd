"use client";
import { useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import ApplyForm from "./ApplyForm";
import { FaTimes } from "react-icons/fa";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";
import DynamicFetch from "@/utils/DynamicFetch";

export default function JobList() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setjobs] = useState([]);

  const  {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch
  }=DynamicFetch("jobs","","","")
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
       setjobs(value)
     } 
  },[data])

 if (status === 'pending')
    return (
      <Loader type={"jobs"}></Loader>
    );

  if (status === "error") return (
      <ErrorCard type={"jobs"} refetch={refetch}></ErrorCard>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onApply={setSelectedJob} />
      ))}

      {selectedJob && (
        <div className="myDiv fixed z-[999] top-25 bottom-0 left-1/2 transform -translate-x-1/2  bg-white dark:bg-black md:px-8 px-4 py-8 rounded-xl shadow-2xl w-full max-w-xl overflow-auto">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6 ">
            Apply for {selectedJob.job}
          </h2>
         <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-6 cursor-pointer text-red-800 text-2xl">
                <FaTimes />
            </button>
          <ApplyForm job={selectedJob} />
        </div>
      )}
    </div>
  );
}
