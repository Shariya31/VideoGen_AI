import expres from 'express'
import { inngest } from '../ingest/index.js';

const router = expres.Router();

router.post('/generate-video', async(req, res)=>{
  try {
     const {script, title, topic, videoStyle, videoVoice} = req.body
  
     const result = await inngest.send({
      name: 'generate-video-data',
      data: {
         script, title, topic, videoStyle, videoVoice
      }
     })
     return res.status(200).json({
        success: true,
        message: 'Data fetched',
        result
     })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal Server Error'+error
    })
  }
})

export default router