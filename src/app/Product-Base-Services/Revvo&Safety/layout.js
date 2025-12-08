import React from 'react'
import Navbar from './components/Navbar'


const layout = ({children}) => {

  return (
    <div className=''>
      <header className=''>
        <Navbar />
      </header>
      <main className=' bg-white dark:bg-gray-800 w-full'>
        {children}
      </main>
    </div>
  )
}

export default layout