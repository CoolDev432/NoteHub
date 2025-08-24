'use client'

import React, { useState, useEffect } from 'react'
import mermaid from 'mermaid'

const ReportCard = () => {
  const [File, setFile] = useState(null)
  const [Answer, setAnswer] = useState("")
  const [MermaidCode, setMermaidCode] = useState("")
  const [svg, setSvg] = useState("")

  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }

  const handleAnalyzer = async () => {
    if (!File) return
    const formData = new FormData()
    formData.append("file", File)

    const res = await fetch("/api/analyzeReport", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    const analysis = data.analysis || ""

    const [textPart, mermaidPart] = analysis.split("MERMAID:")
    setAnswer(textPart.trim())
    if (mermaidPart) {
      setMermaidCode(mermaidPart.trim())
    }
  }

  useEffect(() => {
    if (MermaidCode) {
      mermaid
        .render("reportCardGraph", MermaidCode)
        .then(({ svg }) => setSvg(svg))
        .catch((err) => console.error("ERROR:", err))
    }
  }, [MermaidCode])

  return (
    <div style={{ fontFamily: 'var(--font-serif)' }} className='flex justify-center items-center flex-col bg-black min-h-[100vh] p-6 text-white'>
      <h1 className='md:text-6xl text-4xl mt-3'>
        Analyze Report Card
      </h1>

      <div className="mt-6">
        <label htmlFor="input">Upload your report card: </label>
        <input type="file" className='cursor-pointer mt-4 text-white' onChange={handleUpload} />
      </div>

      <button
        className='bg-white text-black p-4 rounded-2xl cursor-pointer hover:opacity-90 transition-all mt-4'
        onClick={handleAnalyzer}
      >
        Upload
      </button>

      {Answer && (
        <div className='bg-gray-900 w-[80vw] m-auto h-fit p-6 rounded-2xl mt-10 whitespace-pre-wrap'>
          {Answer}
        </div>
      )}

      {svg && (
        <div
          className="bg-white rounded-2xl p-4 mt-10"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  )
}

export default ReportCard
