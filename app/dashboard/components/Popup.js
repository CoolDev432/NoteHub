import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const Popup = ({ onClose, onUpload }) => {
    const { user } = useUser()
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !file) {
            alert("Please provide both title and file.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        formData.append("email", user.emailAddresses[0].emailAddress);



        await fetch("/api/createNote", {
            method: "POST",
            body: formData
        });


        onUpload({ title, file });
        setTitle('');
        setFile(null);
        console.log(file)
        alert('Note Uploaded')
        onClose();

    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white h-auto w-[50vw] max-w-lg p-6 rounded-2xl shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center text-black">
                    Upload Note
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="file"
                        accept=".pdf,.txt"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded-lg p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-1 transition-all cursor-pointer"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Popup;
