'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation' 

const Page = () => {
  const { user } = useUser()
  const [Items, setItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const email = user?.emailAddresses[0]?.emailAddress

    const fetchNotes = async () => {
      const res = await fetch(`/api/getNoteByEmail?email=${encodeURIComponent(email)}`)
      const data = await res.json()
      console.log(data)
      setItems(data.documents)
    }

    fetchNotes()
  }, [user?.emailAddresses?.[0]?.emailAddress])

  const handleClick = (noteId) => {
    router.push(`/notePage?id=${noteId}`)
  }

  return (
    <div style={{ fontFamily: 'var(--font-serif)' }} className='bg-black h-[100vh] p-5 flex justify-center items-center flex-col'>
      <h1 className='text-6xl'>Your NoteHub.</h1>
      <div className='flex gap-3'>
      {Items.map((item) => (
        <div
          key={item.$id}
          onClick={() => handleClick(item.$id)}
          className='bg-white text-black p-4 text-2xl w-fit rounded-2xl mt-3 cursor-pointer hover:opacity-90 hover:scale-110 transition-all duration-300'
        >
          <h1>{item.title}</h1>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Page
