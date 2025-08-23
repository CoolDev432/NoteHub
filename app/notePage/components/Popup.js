import React, { useEffect, useState } from 'react'

const Popup = ({ onClose, text }) => {
    const [summary, setSummary] = useState('Loading summary...')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/summarizeNote`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text }),
                })
                const data = await res.json()

                setSummary(data.summary || 'No summary available.')

            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (text) fetchSummary()
    }, [text])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-[90vw] max-w-lg p-8 rounded-2xl shadow-2xl relative animate-fadeIn overflow-y-scroll">
                <button
                    className="absolute top-3 right-4 text-gray-400 hover:text-blue-500 cursor-pointer text-2xl font-bold transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-700">Summary</h2>
                    {loading ? (
                        <p className="text-gray-700">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Popup
