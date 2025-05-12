import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../components/RemotionPlayer/RemotionPlayer'
import VideoInfo from '../components/VideoInfo/VideoInfo'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const VideoPlay = () => {
    const [videoData, setVidoeData] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const {id} = useParams()
    let server = import.meta.env.VITE_SERVER
    const getVideoById = async()=>{
        setLoading(true)
        setError('')
        try {
            const response = await axios.get(`${server}/api/generated-video/${id}`)
            console.log(response)
            setVidoeData(response?.data)
        } catch (error) {
            setError(error.massage)
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        getVideoById()
    }, [id])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-7">
        <div>
            <RemotionPlayer videoData={videoData}/>
        </div>
        <div>
            {/* Video information */}
            {/* <VideoInfo/> */}
        </div>
    </div>
  )
}

export default VideoPlay