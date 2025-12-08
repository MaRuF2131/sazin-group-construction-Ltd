"use client"
export const dynamicParams = true; // Allow other IDs at runtime
import React from 'react'
import QueryFunction from '@/app/Product-Base-Services/Revvo&Safety/components/queryFuction'
import { useParams } from 'next/navigation';
function Page() {

const { category } = useParams();
if(!category){
  return <p className="text-center text-red-600 text-sm md:text-base">
        Category not found
      </p>
}
  return (
    <div>
        <QueryFunction value={decodeURIComponent(category)} ky='category' />
    </div>
  )
}

export default Page