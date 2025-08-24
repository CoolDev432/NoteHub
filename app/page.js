'use client'

import React from 'react'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Features from './components/Features'

const page = () => {
  return (
    <div className='h-[150vh] bg-black'>
        <Hero />
        <Features />
        <Footer />
    </div>
  )
}

export default page