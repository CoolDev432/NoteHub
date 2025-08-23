'use client'

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Nav from './Nav';

const Hero = () => {
  const pRef = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      pRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
    gsap.fromTo(
      h1Ref.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 2, delay: 0.7, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="text-center flex justify-center items-center flex-col h-[100vh] py-16 border-t-2 border-l-2 border-r-2 border-dotted border-white">
      <div className='text-left '>
        <p ref={pRef} className="md:text-2xl" style={{ fontFamily: 'var(--font-serif)' }}>The Place for all your notes</p>
        <h1 ref={h1Ref} className="md:text-9xl text-6xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          NotesHub
        </h1>
        <Nav />
      </div>
    </div>
  );
}

export default Hero