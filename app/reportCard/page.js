'use client'

import React, { useState, useEffect } from 'react'

const page = () => {
    const [File, setFile] = useState(null)
    const [Answer, setAnswer] = useState()
    const handleUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAnalyzer = async () => {
        const formData = new FormData();
        formData.append("file", File);

        const res = await fetch("/api/analyzeReport", {
            method: "POST",
            body: formData
        });
        const data = await res.json()

        setAnswer(data.analysis)
        
    }
    useEffect(() => {
        console.log(File)
    }, [File])

    return (
        <div style={{ fontFamily: 'var(--font-serif)' }} className='flex justify-center items-center flex-col'>
            <h1 className='md:text-6xl text-4xl mt-3'>
                Analyze Report Card .
            </h1>
            <div>
                <label htmlFor="input">Upload your report card: </label>
                <input type="file" name="" id="" className='cursor-pointer mt-10' onChange={handleUpload} />
            </div>

            <button className='bg-white text-black p-4 rounded-2xl cursor-pointer hover:opacity-90 transition-all transition-1 mt-4' onClick={() => {
                handleAnalyzer()
            }}>
                Upload
            </button>

            <div className='bg-gray-900 w-[80vw] m-auto h-fit p-3 rounded-2xl mt-10 break-all whitespace-pre-wrap '>
                {Answer}
            </div>
        </div>
    )
}

export default page