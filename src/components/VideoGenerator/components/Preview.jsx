import React from 'react'
import { options } from './VideoStyle'

const Preview = ({formData}) => {
    const selectedVideoStyle = formData&&options.find((item=>item.name===formData?.videoStyle))
  return (
    <div>
        <h2 className='text-xl font-bold mb-2 text-center'>Preview</h2>
        <img className='w-full h-[77vh] object-cover rounded-lg' src={selectedVideoStyle?.iamge} alt={selectedVideoStyle?.name} width={1000} height={300} />
    </div>
  )
}

export default Preview