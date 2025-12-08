'use client'
import React,{ useEffect, useRef, useState } from 'react'
import Helmetsads from './Helmetsads'
import {AnimatedSection2,AnimatedSection} from '@/utils/ScrollMontion'
import Category from './CategoryList'
import Link from 'next/link'
function CategotySection() {

      const [helmHeight, setHelmHeight] = useState(0);
      const helmRef = useRef();
      useEffect(() => {
        setHelmHeight(helmRef.current.offsetHeight);
      }, [helmRef.current]);

  return (
   <>
           <div ref={helmRef} className='z-[40] relative'>

              <Helmetsads />
            </div>
          <section className="relative mx-auto z-[50] dark:bg-black/30 pb-16 px-4 lg:px-10 overflow-hidden flex flex-col items-center justify-center w-full"

            style={{ marginTop: `-${helmHeight}px`, paddingTop: `${helmHeight/2}px` }}

          >
            <AnimatedSection2>
                <h2 className="text-center w-full text-2xl md:text-4xl font-semibold text-white mb-12">
                  DISCOVER <span className="text-red-600">OUR CATEGORIES</span>
                </h2>
              </AnimatedSection2>
              <AnimatedSection>
                <Category/>
              </AnimatedSection>
             <Link href={"/Product-Base-Services/Revvo&Safety/All"} className='mt-10 justify-left hover:text-red-600 dark:text-gray-100'>See more →</Link> 
         </section>
   </>
  )
}

export default CategotySection