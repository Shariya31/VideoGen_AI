export async function generateAudio(text) {
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", {
      method: "POST",
      headers: {
        "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });
  
    if (!response.ok) throw new Error("Audio generation failed");
  
    const blob = await response.blob();
    return URL.createObjectURL(blob); // You can use this as audio src
  }
  