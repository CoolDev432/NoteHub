import React from 'react'
import Link from 'next/link'
const Nav = () => {
  return (
    <div className='bg-white text-black mb-5  p-4 rounded-2xl'>
      <Link href={'/notes'}>
        All Your Notes
      </Link>
      <Link href={'/sharedNotes'} className='ml-6'>
        Shared Notes
      </Link>
      <Link href={'/reportCard'} className='ml-6'>
        Report Card Analyzer
      </Link>
    </div>
  )
}

export default Nav