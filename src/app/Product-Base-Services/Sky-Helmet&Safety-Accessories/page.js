import React from 'react'
import Banner from './components/Banner'
import CategotySection from './components/CategotySection'


function SkyHelmetsAndAccessories() {
  return (
  <section>
      <div>
        <Banner />
      </div>
      <div className='relative backdrop-blur-lg z-[5] w-full h-auto bg-cover bg-center before:z-[6] before:absolute before:inset-0 before:bg-white/80 dark:before:bg-black/85'
         /* style={{backgroundImage: 'url(/video_avg_color.png)'}} */
       >
          <CategotySection />
      </div>
    </section>
  )
}

export default SkyHelmetsAndAccessories
