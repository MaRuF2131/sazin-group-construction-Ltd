
"use client"
export const dynamicParams = true; // Allow other IDs at runtime
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import Loader from "@/components/Loader";
import ErrorCard from "@/components/ErrorCard";
import { useParams } from "next/navigation";


export default function ProjectDetail() {
  
  const { id } = useParams();

  // 🔹 React Query দিয়ে ID অনুযায়ী data fetch
  const { data:project, isLoading, isError,refetch} = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/projectById/${id}`);
      return res.data?.data || res.data;
    },
    enabled: !!id, // id ready হলে তবেই fetch হবে
    staleTime: 1000 * 60 * 5, // ৫ মিনিট cache
    cacheTime: 1000 * 60 * 30, // 30 minutes cache in memory
    refetchOnWindowFocus: false, // don’t refetch unnecessarily
    refetchOnReconnect: false, // no refetch if net reconnects
    retry: 1, // retry only once if fails
  });

   if (isLoading)
    return (
      <Loader type={"projects"}></Loader>
    );

  if (isError) return (
      <ErrorCard type={"projects"} refetch={refetch}></ErrorCard>
  );

  if (!project)
    return (
      <p className="text-center text-red-600 text-sm md:text-base">
        Project not found
      </p>
    );

  return (
    <>
                {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 border-b px-6 py-3 text-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link
            href="/Projects"
            prefetch={false}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            {`<< Projects`}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-300 max-w-[120px] truncate" title={project.title}>{project.title}</span>
        </div>
      </nav>

    <div className="py-10 bg-white dark:bg-black/60 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
        {/* Left: Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={600}
            height={400}
            priority={true}
            className="w-full max-w-xl rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Right: Text Content */}
        <div className="max-w-lg lg:pl-4">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2 text-red-600">
            {project.title}
          </h1>

              {/* Sub info */}
          <p className="text-gray-600 pt-1.5  dark:text-gray-300 mb-3 text-sm md:text-base">
            {project.category} · 📅 {new Date(project.date).toLocaleString()}
          </p>
          <p className="mb-2 text-gray-700 dark:text-gray-300  text-lg md:text-xl">
            {project.description}
          </p>

        </div>
      </div>
    </div>
    </>
  );
}
