"use client";
import axiosInstance from "@/utils/axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ApplyForm({ job }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] =useState(false);
  const cvFileName = watch("cv")?.[0]?.name || "No file chosen";

const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Attach user fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("cv", data.cv[0]); // File

      // Attach job info
      formData.append("deadline",job.deadline );
      formData.append("jobType", job.jobType);
      formData.append("job", job.job);
      formData.append("description", job.description);
      formData.append("location", job.location);
      formData.append("salary", job.salary);

      const res = await axiosInstance.post("/job/apply-job", formData);

      const result = await res.data;
        
      if (!result.success) {
        alert(result.message);
        return;
      }

      alert("Application submitted successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1 text-black dark:text-gray-300">Full Name</label>
        <input
          {...register("name", { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-gray-600"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Full Name is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black dark:text-gray-300">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-gray-600"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-black dark:text-gray-300">Phone</label>
        <input
          type="text"
          {...register("phone", { required: true })}
          className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-gray-600"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">Phone number is required</p>
        )}
      </div>

<div>
  <label className="block text-sm font-medium mb-1 text-black dark:text-gray-300">
    Upload CV
  </label>

  <div className="relative">
    {/* Hidden file input */}
    <input
      type="file"
      id="cv"
      {...register("cv", { required: true })}
      className="hidden"
    />

    {/* Custom button & filename display */}
    <label
      htmlFor="cv"
      className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition font-medium shadow-md"
    >
      <span>Select File</span>
      <span
        id="cvFileName"
        className="ml-3 text-sm text-white/90 truncate max-w-[150px]"
      >
        {cvFileName || 'No file chosen'}
      </span>
    </label>
  </div>

  {errors.cv && (
    <p className="text-red-500 text-sm mt-1">CV upload is required</p>
  )}
</div>


      <button
        type="submit"
        disabled={loading || new Date(job.deadline) < new Date()}
        className={`w-full  py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ${loading || new Date(job.deadline) < new Date() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
       {  loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
