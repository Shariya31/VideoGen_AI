// src/services/runway.js
export const generateVideo = async (prompt) => {
    const res = await fetch('https://api.runwayml.com/v1/text_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_RUNWAY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        model: 'gen2', // or specific model ID
        length_seconds: 10
      })
    });
  
    const data = await res.json();
    return data.video_url; // or polling logic if async
  };
  