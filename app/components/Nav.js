'use client'

import React , {useRef} from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { SignUpButton, SignInButton, SignedOut, SignedIn, SignOutButton } from '@clerk/nextjs'
const Nav = () => {
    const nav = useRef(null)

    gsap.fromTo(
      nav.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    );
  return (
    <div>
        <SignedOut>
            <div ref={nav} className='flex justify-center items-center bg-white text-black w-50 rounded-4xl p-3 m-auto' style={{ fontFamily: 'var(--font-serif)' }}>
            <SignInButton className=" cursor-pointer hover:scale-120"/>
            <SignUpButton className="ml-5 cursor-pointer hover:scale-120"/>
            </div>
        </SignedOut>

        <SignedIn>
            <div ref={nav} className='flex justify-center items-center bg-white text-black w-50 rounded-4xl p-3 m-auto' style={{ fontFamily: 'var(--font-serif)' }}>
            <Link href={'/dashboard'} className='cursor-pointer hover:scale-110 transition-all transition-1'> 
                Dashboard   
            </Link>
                <SignOutButton className="ml-5 cursor-pointer hover:scale-110 transition-all transition-1"/>
            </div>
        </SignedIn>
    </div>
  )
}

export default Nav