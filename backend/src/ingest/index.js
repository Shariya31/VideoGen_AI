import { Inngest } from "inngest";
import axios from 'axios'


// Create a client to send and receive events
export const inngest = new Inngest({ id: "VideoGen_AI" });

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
                const result = await axios.post(BASE_URL+'/api/text-to-speech',
                    {
                        input: script,
                        voice: videoVoice
                    },
                    {
                        headers: {
                            'x-api-key': process.env.AIGURU_LAB_API_TOKEN, // Your API Key
                            'Content-Type': 'application/json', // Content Type
                        },
                    })
                console.log(result.data.audio) //Output Result: Audio Mp3 Url
                return result.data.audio
            }
        )
        //generate captions

        //generate image

        //generate images

        //save 
        return generateAudioFile
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    helloWorld,
    generateVideoData
];
