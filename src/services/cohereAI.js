export async function generateVideoIdeas(promptText) {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Give me 2 viral short video ideas based on: ${promptText} Do not write any suggestion or follow up messages just plain text`,
        max_tokens: 100,
        temperature: 0.9,
      }),
    });
  
    if (!response.ok) throw new Error("Failed to generate video ideas");
    const data = await response.json();
    console.log(data)
    return data.generations[0].text;
  }
  
  export const generateVideoOutline = async (ideaText) =>{
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Create a step-by-step outline or script for this short video idea: ${ideaText}`,        
        // max_tokens: 100,
        // temperature: 0.9,
      }),
    })

    if(!response.ok) throw new Error('Failed to generate video outline');
    const data = await response.json();
    console.log(data)
    return data.generations[0].text

  }