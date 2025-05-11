import React, { useState } from 'react'

export const options = [
    {
        name: 'Realistic',
        iamge: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmVhbGlzdGljJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Cinematic',
        iamge: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmVhbGlzdGljJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Cartoon',
        iamge: 'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: 'Cyber Punk',
        iamge: 'https://images.unsplash.com/photo-1740989475605-355ada18c3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UmVhbGlzdGljJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D'
    }
]

const VideoStyle = ({ onHandleInputChange }) => {
    const [selectedStyle, setSelectedStyle] = useState()
    return (
        <div>
            <h2>Video Style</h2>
            <p>Select Video Style</p>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
                {options.map((option) => (
                    <div className='relative' key={option.name} onClick={() => { setSelectedStyle(option.name); onHandleInputChange('videoStyle', option.name) }}>
                        <img className={`object-cover h-[150px] md:h-[130px] lg:h-[130px] xl:h-[180px] border-gray-700 border-2 rounded-lg p-1 hover:scale-105 ease-in-out duration-500 ${selectedStyle === option.name ? 'opacity-70' : ''}`} src={option.iamge} alt={option.name} width={500} height={120} />
                        <h2 className='absolute bottom-1 text-white w-full text-center font-bold'>{option.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VideoStyle