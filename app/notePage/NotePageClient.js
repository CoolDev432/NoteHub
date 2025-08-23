'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MdSend } from "react-icons/md"
import Nav from './components/Nav'

const NotePageClient = () => {
  const searchParams = useSearchParams()
  const noteId = searchParams.get('id')
  const [noteData, setNoteData] = useState(null)
  const [pdfText, setPdfText] = useState('')
  const [question, setQuestion] = useState('')
  const [chat, setChat] = useState([])
  const [responseText, setResponseText] = useState('Response will show here')

  const askQuestion = async () => {
    if (!question) return
    setChat(prev => [...prev, `user: ${question}`])

    try {
      const res = await fetch('/api/askAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: pdfText,
          question,
          chat: chat.join('\n')
        })
      })
      const data = await res.json()
      const answer = data || 'No answer'
      setResponseText(answer)
      setChat(prev => [...prev, `ai: ${answer}`])
      setQuestion('')
    } catch (err) {
      console.error(err)
      setResponseText('ERROR')
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      if (!noteId) return
      try {
        const res = await fetch(`/api/getNoteById?id=${encodeURIComponent(noteId)}`)
        const data = await res.json()
        setNoteData(data.documents?.[0] || null)
      } catch (err) {
        console.error(err)
      }
    }
    fetchNotes()
  }, [noteId])

  const extractPdfText = async (url) => {
    if (!url) return
    try {
      const res = await fetch(`/api/extractText?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      if (data.text) setPdfText(data.text)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (noteData?.noteLink) extractPdfText(noteData.noteLink)
  }, [noteData])

  if (!noteData) return <p className="text-center mt-10">Loading note...</p>

  return (
    <div className='min-h-screen bg-black'>
      <Nav pdfText={pdfText} link={noteData.noteLink} title={noteData.title} />

      <div className='flex justify-center items-center w-full my-4 px-2'>
        <iframe
          src={noteData.noteLink}
          frameBorder="0"
          className="w-full max-w-4xl h-96 md:h-[520px]"
        ></iframe>
      </div>

      <div className='text-white px-2 sm:px-4 md:px-8 lg:px-16 font-serif'>
        <div className='flex flex-col items-center gap-6'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-center'>ChatItOut</h1>

          <div className='bg-gray-900 p-4 rounded-2xl w-full max-w-6xl break-words'>
            <h2 className='text-2xl sm:text-3xl'>🤖:</h2>
            <p className='mt-2 text-lg sm:text-xl'>{responseText}</p>
          </div>

          <div className='flex flex-col sm:flex-row w-full max-w-3xl gap-3'>
            <input
              type="text"
              value={question}
              className='flex-1 p-3 rounded-3xl bg-white text-black'
              placeholder='Type your question from the content of this note here!'
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              onClick={askQuestion}
              className='bg-green-600 text-white p-3 rounded-3xl flex justify-center items-center hover:bg-green-500 transition-colors cursor-pointer'
            >
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotePageClient
