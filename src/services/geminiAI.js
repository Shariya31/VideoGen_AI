// src/services/ideaGenerator.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateVideoIdeas = async (topic) => {
  try {
    // Get the correct model (use 'gemini-1.0-pro' or 'gemini-1.5-pro-latest')
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",  // Updated model name
      generationConfig: {
        maxOutputTokens: 1000,
      }
    });

    const prompt = `Generate 3 creative YouTube video ideas about ${topic}. 
      Format each idea as: "Title: [Title]\nDescription: [1-2 sentences]\nTags: [3-5 tags]"
      Separate ideas with "---"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response into structured data
    return text.split("---").map(idea => {
      const lines = idea.split("\n").filter(line => line.trim() !== "");
      return {
        title: lines[0].replace("Title: ", ""),
        description: lines[1].replace("Description: ", ""),
        tags: lines[2].replace("Tags: ", "").split(", ")
      };
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate ideas. Please try again later.");
  }
};