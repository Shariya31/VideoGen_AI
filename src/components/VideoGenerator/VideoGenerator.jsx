import { useState } from "react";
import Topic from "./components/Topic";
import VideoStyle from "./components/VideoStyle";
import Voice from "./components/Voice";
import Preview from "./components/Preview";

function VideoGenerator() {
  const [formData, setFormData] = useState({});

  const onHandleInputChange = (fieldName,fieldValue)=>{ 
    setFormData(prev => ({
      ...prev,
      [fieldName]:fieldValue
    }))
    console.log(formData)
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Video</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <div className="col-span-2 border-1 rounded-xl h-[77vh] overflow-auto px-7">
          <Topic onHandleInputChange={onHandleInputChange}/>
          <VideoStyle onHandleInputChange={onHandleInputChange}/>
          <Voice onHandleInputChange={onHandleInputChange}/>
          <button className="bg-black cursor-pointer 
        text-white px-4 py-2 rounded mt-4">Generate Video</button>
        </div>
        <div className="col-span-1">
          <Preview formData={formData}/>
        </div>
      </div>
    </div>
  )

}

export default VideoGenerator;
