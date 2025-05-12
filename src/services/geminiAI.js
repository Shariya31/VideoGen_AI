import {
  GoogleGenAI,
} from '@google/genai';

export const generateVideoIdeas = async (topic) => {
  const ai = new GoogleGenAI({
    apiKey:import.meta.env.VITE_GEMINI_API_KEY,
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
          text: `Write two different scripts for 30 sec video on Topic : ${topic}

Do not add scene description
Do not add anything in braces. Just return the plain stroy in text
Give me response in JSON format and follow the schema
-{
  scripts: [
   {
   content: 
}
]
}`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
{
  "scripts": [
    {
      "content": "Once upon a time, in a cozy little forest, lived a tiny squirrel named Squeaky. Squeaky loved collecting nuts, but he was also very forgetful. One sunny morning, he gathered a huge pile, bigger than himself! He scampered around, burying them everywhere. Later, when winter arrived, Squeaky couldn't remember where he'd hidden his treasure. He searched and searched, his little nose twitching. A friendly bluebird chirped, 'Look up, Squeaky!' And there, in a hollow tree, was his biggest nut stash, sparkling with snow. Squeaky learned that day, even the smallest squirrel needs to remember!"
    },
    {
      "content": "Once there was a little firefly named Flicker who was afraid of the dark. All the other fireflies loved lighting up the night, but Flicker stayed hidden. 'I can't shine!' he'd whisper. One night, a little lost bunny hopped by, scared and alone. Flicker saw her tears and knew he had to help. He took a deep breath and with all his might, flickered! A tiny light, but enough to guide the bunny home. The bunny smiled and Flicker realized that even a small light can make a big difference."
    }
  ]
}
\`\`\``,
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
    // console.log(chunk.text);
  }
  return fullResponse
}




