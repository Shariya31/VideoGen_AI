export async function generateVideoIdeas(promptText) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative assistant for short video ideas.",
          },
          {
            role: "user",
            content: `Give me 3 viral short video content ideas based on: ${promptText}`,
          },
        ],
        max_tokens: 300,
      }),
    });
  
    if (!response.ok) throw new Error("Failed to generate video ideas");
  
    const data = await response.json();
    return data.choices[0].message.content;
  }
  