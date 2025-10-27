"use client";

import { MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";

export default function JobCard({ job, onApply }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-md hover:shadow-lg transition">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">{job.job}</h3>

      <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
        <MapPin size={16} /> {job.location} · <Briefcase size={16} /> {job.jobType}
      </p>

      {/* Salary Section */}
      {job.salary && (
        <p className="flex items-center gap-2 mt-2 text-gray-700 dark:text-gray-300 font-medium">
          <DollarSign size={18} className="text-green-500" />
          {job.salary}
        </p>
      )}

      <p className="mt-2 text-gray-700 dark:text-gray-300">{job.description}</p>

      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
        <Calendar size={16} /> Deadline: {new Date(job.deadline).toLocaleDateString()}
      </p>

      <button
        onClick={() => onApply(job)}
        className="mt-4 px-4 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-800 transition"
      >
        Apply Now
      </button>
    </div>
  );
}
