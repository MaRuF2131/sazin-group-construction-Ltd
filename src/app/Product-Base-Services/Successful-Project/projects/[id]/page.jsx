import { projects } from "../../projects";
import Image from "next/image"; 

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id.toString(), // must be a string for Next.js
  }));
}

export default function ProjectDetails({ params }) {
  const project = projects.find((p) => p?.id === parseInt(params?.id));

  if (!project) {
    return <div className="p-10 text-center text-red-600">Project not found</div>;
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-gray-100 dark:bg-black">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Image */}
        <div className="flex items-center justify-center">
          <Image
            src={project.img}
            alt={project.title}
            className="rounded-lg shadow-md max-h-[400px] object-contain"
            width={300}
            height={200}
          />
        </div>

        {/* Right Content */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {project.title}
          </h1>
          <div className="flex gap-4 text-gray-500 text-sm mb-4">
            <span>📅 {project.date}</span>
            <span>🏷 {project.category}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}
