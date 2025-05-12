import { Inngest } from "inngest";
import { createClient } from '@deepgram/sdk'
import axios from 'axios'
import { generateImageScript } from "../../../src/AiModel/aiModel.js";
import Video from "../model/videoSchema.js";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "VideoGen_AI" });

// const imagePromptScript = `Generate image prompt of {style} style with all the details for each scene for 30 sec video : script : {script}
// - Just give specifing image prompt depends on the story line
// - do not give camera angle image prompt
// - Follow the following schema and return JSON data (Max 4-5 images)
// - [
//     {
//         imagePrompt: '',
//         sceneContent: '<Script Content>'
//     }
// ]
// `

const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

const BASE_URL = 'https://aigurulab.tech';
export const generateVideoData = inngest.createFunction(
    { id: 'generate-video-data' },
    { event: 'generate-video-data' },
    async ({ event, step }) => {
        const { script, title, topic, videoStyle, videoVoice } = event?.data
        //Generate audio file
        const generateAudioFile = await step.run(
            "generateAudioFile",
            async () => {
                const result = await axios.post(BASE_URL + '/api/text-to-speech',
                    {
                        input: script.content,
                        voice: videoVoice
                    },
                    {
                        headers: {
                            'x-api-key': process.env.AIGURU_LAB_API_TOKEN, // Your API Key
                            'Content-Type': 'application/json', // Content Type
                        },
                    })
                console.log("11110",result.data.audio) //Output Result: Audio Mp3 Url
                return result.data.audio
                // return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1747037227476.mp3?alt=media&token=425af71a-c0bb-4034-98e5-f9867f80689d"
            }
        )
        //generate captions
        const generateCaptions = await step.run(
            "generateCaptions",
            async () => {
                const deepgram = createClient(process.env.DEEPGRAM_API_TOKEN);
                // STEP 2: Call the transcribeUrl method with the audio payload and options
                const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
                    {
                        url: generateAudioFile,
                    },
                    // STEP 3: Configure Deepgram options for audio analysis
                    {
                        model: "nova-3",
                    }
                );
                return result?.results?.channels[0]?.alternatives[0]?.words
            }
        )

        //generate image script
        const generateImagePrompts = await step.run(
            "generateImagePrompt",
            async () => {
                const result = await generateImageScript(videoStyle, script.content)
                const response = JSON.parse(result)
                // console.log(script.content)
                return response
            }
        )
        //generate images
        const generateImage = await step.run(
            "generateImage",
            async () => {
                let images = []
                images = await Promise.all(
                    generateImagePrompts.map(async (element) => {
                        const result = await axios.post(BASE_URL + '/api/generate-image',
                            {
                                width: 1024,
                                height: 1024,
                                input: element?.imagePrompt,
                                model: 'sdxl',//'flux'
                                aspectRatio: "1:1"//Applicable to Flux model only
                            },
                            {
                                headers: {
                                    'x-api-key': process.env.AIGURU_LAB_API_TOKEN, // Your API Key
                                    'Content-Type': 'application/json', // Content Type
                                },
                            })
                        console.log(result.data.image) //Output Result: Base 64 Image
                        return result.data.image

                    })
                )
                return images
            }
        )

        //save 
        const saveAllData = await step.run(
            "saveAllData",
            async () =>{
                await Video.create({
                    title: topic,
                    audioUrl: generateAudioFile,
                    captions: generateCaptions,
                    imagse: generateImage
                })
            }
        )
        return 'Data Save To Db'
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    helloWorld,
    generateVideoData
];
