import { useState } from "react";
import { generateVideoIdeas, generateVideoOutline } from "../services/cohereAI";

function VideoGenerator() {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateIdeas = async () => {
    setLoading(true);
    setError("");
    setOutline("");
    try {
      const response = await generateVideoIdeas(topic);
      setIdeas(response.split("\n").filter((line) => line.trim() !== ""));
    } catch (err) {
      setError("Failed to fetch ideas.");
      console.log(err.message)
    }
    setLoading(false);
  };

  const handleIdeaClick = async (idea) => {
    setLoading(true);
    setError('')
    setOutline("");
    try {
      const outlineText = await generateVideoOutline(idea);
      setOutline(outlineText);
    } catch (err) {
      setError("Failed to generate outline.");
      console.log(err.message)
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-evenly md:justify-end lg:justify-end m-8 items-center md:gap-20 lg:gap-80 flex-wrap border-2 border-pink-300">

      <div className="w-[40rem] p-6 max-w-full border-2 border-red-400">
        <h1 className="text-2xl font-bold mb-4">Create New Video</h1>
        <h1 className="font-bold mb-4">Video Title</h1>
        <input
          type="text"
          placeholder="Enter your topic"
          // value={topic}
          // onChange={(e) => setTopic(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <h1 className="font-bold mb-4">Video Topic</h1>
        <input
          type="text"
          placeholder="Enter your topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={handleGenerateIdeas}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Generate Ideas
        </button>

        {loading && <p className="mt-4 text-blue-600">Loading...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <ul className="mt-6 space-y-3 flex gap-6">
          {ideas.map((idea, index) => (
            <li
              key={index}
              className="cursor-pointer border p-3 hover:bg-gray-100 rounded"
              onClick={() => handleIdeaClick(idea)}
            >
              {idea}
            </li>
          ))}
        </ul>

        {outline && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Video Outline</h2>
            <pre className="bg-gray-50 p-4 whitespace-pre-wrap">{outline}</pre>
          </div>
        )}
      </div>
      <div className="border-2 border-red-500">
        preview
      </div>
    </div>
  );
}

export default VideoGenerator;
