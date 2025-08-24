'use client'

import React, { useEffect, useState } from 'react'
import { MdSave } from 'react-icons/md'
import { useUser } from '@clerk/nextjs'
const SharedNotes = () => {
  const { user } = useUser()
  const [notes, setNotes] = useState([])
  var email = user?.emailAddresses[0].emailAddress
  const saveNote = async (title, link)=>{
    const res = await fetch(`/api/saveNote?title=${title}&link=${link}&email=${email}`)
  }

  const fetchNotes = async () => {
    try {
      const res = await fetch(`/api/getSharedNotes`)
      const data = await res.json()
      setNotes(data.documents)
    } catch (err) {
      console.error('ERROR:', err)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className='flex flex-col items-center border-t-2 bg-black  border-b-2 border-l-2  border-r-2 border-white border-dotted' style={{ fontFamily: 'var(--font-serif)' }}>
      <h1 className='text-5xl mt-6 mb-8 font-bold'>Shared Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-6">
        {notes.map((note) => (
          <div key={note.$id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
            <MdSave size={24} className='text-blue-600 cursor-pointer' onClick={()=>{
              saveNote(note.title, note.noteLink)
            }} />

            <h2 className="text-xl font-semibold mb-4 text-black">{note.title}</h2>
            <iframe
              src={note.noteLink}
              frameBorder="0"
              className="w-full rounded-lg"
              style={{ height: '400px' }}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SharedNotes
