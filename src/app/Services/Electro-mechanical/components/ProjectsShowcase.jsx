'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  { title: '220/132kV Substation Aux Systems', img: '/electroCard1.jpg' },
  { title: 'Industrial HVAC & Cleanroom', img: '/electroCard2.jpg' },
  { title: 'Integrated Fire & BMS', img: '/electroCard3.jpg' },
];

export default function ProjectsShowcase() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-16 px-6 lg:px-8">
      <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-900 dark:text-white">
        Sample <span className='text-red-600'>Projects</span>
      </h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p) => (
          <div
            key={p.title}
            className="group relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={p.img}
              alt={p.title}
              width={600}
              height={400}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 flex items-center justify-between">
              <span className="font-semibold text-gray-900 dark:text-white">
                {p.title}
              </span>
              <FaExternalLinkAlt className="text-red-600 group-hover:text-red-700 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/Projects"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors"
        >
          View All Projects
          <FaExternalLinkAlt />
        </Link>
      </div>
    </section>
  );
}
