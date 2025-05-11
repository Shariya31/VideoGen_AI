import React, { useState } from 'react'
const voices = [
    {
        "value": "af_sarah",
        "name": "Sarah (Female)"
    },
    {
        "value": "af_sky",
        "name": "Sky (Female)"
    },
    {
        "value": "am_adam",
        "name": "Adam (Male)"
    },
    {
        "value": "af_alpha",
        "name": "Alpha (Female)"
    },
]

const Voice = ({onHandleInputChange}) => {
    const [selectedVoice, setSelectedVoice] = useState('');
    return (
        <div>
            <h2>Voices</h2>
            <p className='text-sm'>Select a voice</p>
            <div className='grid grid-cols-2 gap-3'>
                {voices.map((voice) => (
                    <h2 className={`cursor-pointer text-white p-3 dark:bg-slate-900 
                    dark:border-white rounded-lg hover:scale-95 ease-in-out duration-300 ${selectedVoice === voice.name ? 'opacity-90' : ''}`} key={voice.name} onClick={()=>{
                        setSelectedVoice(voice.name);
                        onHandleInputChange('videoVoice', voice.value)
                    }}>{voice.name}</h2>
                ))}
            </div>
        </div>
    )
}

export default Voice