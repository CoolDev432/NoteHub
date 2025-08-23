'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation' // App Router

const Page = () => {
  const { user } = useUser()
  const [Items, setItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const email = user?.emailAddresses[0]?.emailAddress
    if (!email) return // prevent fetching with undefined

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
    <div style={{ fontFamily: 'var(--font-serif)' }} className='p-5 flex justify-center items-center flex-col'>
      <h1 className='text-6xl'>Your NoteHub.</h1>
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
  )
}

export default Page
