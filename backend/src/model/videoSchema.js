import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        audioUrl: {
            type: String
        },

        captions: {
            
        },
        imagse: {

        }
    }
)

const Video = mongoose.model('Video', videoSchema)

export default Video