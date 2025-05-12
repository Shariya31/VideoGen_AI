import {
  GoogleGenAI,
} from '@google/genai';

export const generateImageScript = async(style, content)=>{
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_TOKEN,
  });
  const config = {
    responseMimeType: 'application/json',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Generate image prompt of ${style} style with all the details for each scene for 30 sec video : script : ${content}
- Just give specifing image prompt depends on the story line
- do not give camera angle image prompt
- Follow the following schema and return JSON data (Max 4-5 images)
- [
    {
        imagePrompt: '',
        sceneContent: '<Script Content>'
    }
]
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `I am unable to generate images directly. However, I can provide the JSON data containing image prompts based on your script and desired style.

Please be aware that the capability to generate images is only enabled for the "Gemini 2.0 Flash Experimental" model when the selected output format is "Images and text".

To proceed, please provide the desired style and script for the 30-second video. Once I have that information, I will generate the JSON data in the format you specified.
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `just show the the json
`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `Okay, I will provide the JSON data with example prompts, assuming a basic and generic script. You'll need to replace these with your actual script and preferred style.

\`\`\`json
[
    {
        "imagePrompt": "A bustling city street at sunrise. People walking, cars driving, sunlight reflecting off skyscrapers. Warm color palette. Impressionistic style.",
        "sceneContent": "[SCENE START] EXT. CITY STREET - MORNING. People rush to work. [0-5 seconds]"
    },
    {
        "imagePrompt": "Close-up of a person's face looking thoughtful, gazing out a window. Rain streaking the glass. Muted colors. Noir style.",
        "sceneContent": "INT. APARTMENT - DAY. ANNA (30s) stares out the window. [5-10 seconds]"
    },
    {
        "imagePrompt": "Anna walking through a park in autumn, fallen leaves crunching underfoot. Trees with vibrant fall colors. Realistic style.",
        "sceneContent": "EXT. PARK - DAY. Anna walks slowly, lost in thought. [10-15 seconds]"
    },
    {
        "imagePrompt": "Anna smiling warmly, laughing with a friend at an outdoor cafe. Sunlight dappling through the trees. Bright and cheerful colors. Watercolor style.",
        "sceneContent": "EXT. CAFE - DAY. Anna is talking and laughing with MARK. [15-20 seconds]"
    },
     {
        "imagePrompt": "Anna and Mark holding hands looking at the sunset by the beach, waves crushing, dramatic lighting, realistic style",
        "sceneContent": "EXT BEACH- DAY. Anna and Mark enjoys sunset together [20-25 seconds]"
    },
     {
        "imagePrompt": "Anna and Mark in their wedding day in the church, everyone is happy and celebrating , dramatic lighting, realistic style",
        "sceneContent": "INT CHURCH - DAY. Anna and Mark's wedding day [25-30 seconds]"
    }
]
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
   let fullResponse = ''
  for await (const chunk of response) {
     fullResponse +=chunk.text
    console.log("12121",chunk.text);
  }
  return fullResponse
}