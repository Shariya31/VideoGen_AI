import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'


const VideoList = () => {
    const [videoList, setVideoList] = useState([])
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    let server = import.meta.env.VITE_SERVER

    const getVideoList = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await axios.get(`${server}/api/generated-video`)
            setVideoList(response?.data?.videoData)
            console.log(response)
            console.log(videoList)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVideoList();
    }, [])
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Videos</h1>
            {videoList?.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                    <h2> No Videos Created Yet</h2>
                    <Link to='/new-video'>
                        <button className="bg-black hover:scale-105 ease-in-out duration-500 cursor-pointer 
        text-white px-4 py-2 rounded mt-4">Generate New Video</button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-7">
                    {loading && <h2>Loading...</h2>}
                    {error && <h2>Something went wrong while fetching the videos</h2>}
                    {videoList?.map((video, index) => (
                        <div key={index}>
                            <Link to={`/video-play/${video._id}`}>
                                <img className="w-full h-[25rem] object-cover rounded-xl, aspect-[2/3]" src={video.imagse[0]} alt={video.title} />
                            </Link>
                            <div>
                                {video?.title}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default VideoList