'use client'
import Popup from './Popup'
import React, { useState } from 'react'
import { FaCopy, FaShare } from 'react-icons/fa';

const Nav = ({ pdfText, link, title }) => {
  const [showPopup, setShowPopup] = useState(false)

  const shareNotes = async () => {
    await fetch(`/api/shareNotes?link=${link}&title=${title}`);
  }

  return (
    <nav className="w-full flex flex-wrap justify-center items-center py-4 mb-6 gap-3">
      <div
        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-80 rounded-xl shadow-md cursor-pointer"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h1
          className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide drop-shadow"
          onClick={() => { setShowPopup(!showPopup) }}
        >
          Summarize Note
        </h1>
      </div>

      <div
        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-80 rounded-xl shadow-md cursor-pointer"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        <FaCopy className='text-indigo-500' />
        <h1
          className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide drop-shadow"
          onClick={(e) => {
            navigator.clipboard.writeText(pdfText);
            e.target.innerText = 'Copied!'
            setTimeout(() => {
              e.target.innerText = 'Copy'
            }, 3000);
          }}
        >
          Copy
        </h1>
      </div>

      <div
        className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-80 rounded-xl shadow-md cursor-pointer"
        style={{ fontFamily: 'var(--font-serif)' }}
        onClick={shareNotes}
      >
        <FaShare className='text-indigo-500' />
        <h1 className="text-lg md:text-2xl font-bold text-gray-800 tracking-wide drop-shadow">
          Share
        </h1>
      </div>

      {showPopup && <Popup text={pdfText} onClose={() => setShowPopup(false)} />}
    </nav>
  )
}

export default Nav
