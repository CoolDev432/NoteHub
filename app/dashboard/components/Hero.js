'use client'

import React, { useState } from 'react';
import Popup from './Popup';
import Nav from './Nav';

const Hero = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="text-center flex justify-center items-center flex-col h-[100vh] py-16 border-t-2 border-l-2 border-r-2 border-dotted border-white text-white" style={{ fontFamily: 'var(--font-serif)' }}>
      <Nav />
      <div className='text-left'>
        <p className='text-3xl'>
          Your
        </p>
        <h1 className='md:text-9xl text-5xl'>
          Dashboard
        </h1>
      </div>

      <div className='flex justify-center items-center w-full'>
        <div className='mt-7'>
          <div
            className='bg-white rounded-3xl cursor-pointer hover:scale-110 hover:opacity-80 transition-1 transition-all w-fit'
            onClick={() => setIsPopupOpen(true)}
          >
            <img src="upload.png" alt="" />
          </div>
          <h1 className='text-4xl mt-3 mr-6 text-center'>
            Upload Note
          </h1>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          onClose={() => setIsPopupOpen(false)}
          onUpload={({ title, file }) => {
            console.log("Title:", title); // just for tests
            console.log("File:", file);
          }}
        />
      )}
    </div>
  );
}

export default Hero;
