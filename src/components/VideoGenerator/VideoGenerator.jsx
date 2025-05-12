import { useState } from "react";
import Topic from "./components/Topic";
import VideoStyle from "./components/VideoStyle";
import Voice from "./components/Voice";
import Preview from "./components/Preview";
import axios from 'axios'

function VideoGenerator() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState('')

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
    console.log(formData)
  }

  const handleGenerateVideo = async () => {
    // if (!formData.script || !formData.title || !formData.topic || !formData.videoStyle || !formData.videoVoice) {
    //   console.log('Error', 'Enter all fields')
    //   return
    // }

    try {
      setLoading(true);
      setError("")
      const result = await axios.post('http://localhost:3000/api/generate-video', {
        ...formData
      })
      console.log(result)
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Video</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="col-span-2 border-1 rounded-xl h-[77vh] overflow-auto px-7">
          <Topic onHandleInputChange={onHandleInputChange} />
          <VideoStyle onHandleInputChange={onHandleInputChange} />
          <Voice onHandleInputChange={onHandleInputChange} />
          <button className="bg-black cursor-pointer 
        text-white px-4 py-2 rounded mt-4" disabled={loading} onClick={handleGenerateVideo}>{loading ?'Generating Video' : 'Generate Video'}</button>
        {error && <h2>{error}</h2>}
        </div>
        <div className="col-span-1">
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  )

}

export default VideoGenerator;
