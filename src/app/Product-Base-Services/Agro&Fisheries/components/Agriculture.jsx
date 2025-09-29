"use client";
import React from "react";
import Image from "next/image";

export default function Agriculture({ data }) {
  return (
    <section className="py-12 bg-slate-50 dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-semibold text-green-600 mb-3">
            Agriculture
          </h3>
          <p className="text-slate-600 dark:text-gray-300 mb-4">
            Natural and sustainable farming. The total agricultural land is
            about {data.agriLand} — where rice, vegetables, and fruits are
            cultivated. Modern farming methods and organic fertilizers are used.
          </p>

          <ul className="list-disc pl-5 text-slate-600 dark:text-gray-300 space-y-2">
            <li>Seasonal crops with a controlled irrigation system.</li>
            <li>
              Application of organic fertilizers and Integrated Pest Management
              (IPM).
            </li>
            <li>
              Logistics support for both local markets and wholesale supply.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Image
            src={data.gallery[3]}
            alt="Fisheries"
            className="w-full rounded-xl shadow-md object-cover h-56 sm:h-72"
            width={300}
            height={200}
          />
          <div className="grid grid-cols-2 gap-3">
            <Image
              src={data.gallery[5]}
              alt="pond"
              className="rounded-lg object-cover h-28 w-full"
              width={300}
              height={200}
            />
            <Image
              src={data.gallery[6]}
              alt="feeding"
              className="rounded-lg object-cover h-28 w-full"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
