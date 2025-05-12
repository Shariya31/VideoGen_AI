import expres from 'express'
import { inngest } from '../ingest/index.js';
import Video from '../model/videoSchema.js';

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

router.get('/generated-video', async(req, res)=>{
   try {
      const videoData = await Video.find()
      if(!videoData) return res.status(404).json({
         success: false,
         message: 'No video found'
      })
      return res.status(200).json(
        { success: true,
         message: 'Video Fetched Successfullu',
         videoData
      }
      )
   } catch (error) {
      return res.status(500).json({
         success:false,
         message: 'Internal Server Error' + error
      })
   }
})

router.get('/generated-video/:id', async(req, res)=>{
    try {
    const { id } = req.params;
    
    // Find data by ID
    const data = await Video.findById(id);
    
    if (!data) {
      return res.status(404).json({ 
        success: false,
        message: 'Data not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data
    });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
})

export default router