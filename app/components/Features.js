import React from 'react'

const Features = () => {
    return (
        <div className='flex justify-center items-center flex-col' style={{ fontFamily: 'var(--font-serif)' }}>
            <div>
                <p className='text-3xl'>
                    Amazing
                </p>
                <h1 className='text-8xl'>
                    Features
                </h1>
            </div>

            <div className='flex justify-evenly w-[99vw] flex-wrap '>
                <div className='flex items-center mt-8'>
                    <h1 className='text-8xl'>
                        1.
                    </h1>
                    <div className='ml-3'>
                        <h1 className='text-2xl font-bold'>
                            Report Card Analyzer
                        </h1>
                        <p>
                            Analyze your report card <br />
                            and get all your weak points
                        </p>
                    </div>
                </div>

                <div className='flex items-center mt-8'>
                    <h1 className='text-8xl'>
                        2.
                    </h1>
                    <div className='ml-3'>
                        <h1 className='text-2xl font-bold'>
                            Notes
                        </h1>
                        <p>
                            Upload a note PDF and save it. <br />
                            You will have a suite of features like <br />
                            Link - Doubt Solving, Summarization, etc.
                        </p>
                    </div>
                </div>


                <div className='flex items-center mt-8'>
                    <h1 className='text-8xl'>
                        3.
                    </h1>
                    <div className='ml-3'>
                        <h1 className='text-2xl font-bold'>
                           Share Notes
                        </h1>
                        <p>
                            Share Notes with the community!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Features