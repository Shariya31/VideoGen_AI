import React, { useState } from 'react'
import { generateVideoIdeas, generateVideoOutline } from '../../../services/cohereAI';
import Tabs from '../../../components/Tabs/Tabs.jsx';

const tabsData = [
    {
        label: 'Suggestion',
        content: ['History', 'Kids', 'Movie', 'Space', 'Horror']
    },
]

const Topic = ({onHandleInputChange}) => {
  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaIndex, setSelectedIdeaIndex] = useState(null)
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
      console.log(response)
    } catch (err) {
      setError("Failed to fetch ideas.");
      console.log(err.message)
    }
    setLoading(false);
  };

  const handleIdeaClick = async (idea) => {
    setLoading(true);
    setError('')
    setSelectedIdeaIndex(null)
    setOutline("");
    try {
      const outlineText = await generateVideoOutline(idea);
      setOutline(outlineText);
    } catch (err) {
      setError("Failed to generate outline.");
      console.log(err.message)
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="w-[45rem] p-6 max-w-full">
      <h1 className="font-bold mb-4">Video Title</h1>
      <input
        type="text"
        placeholder="Enter your topic"
        className="border p-2 w-full mb-4"
        onChange={(e)=>onHandleInputChange('title',e.target.value)}
      />
      <h1 className="font-bold mb-4">Video Topic</h1>
       <Tabs
        tabs={tabsData}
        contentClasses="flex flex-wrap gap-3"
        tabButtonClasses="px-4 py-2 font-medium rounded-t-lg transition-colors"
        activeTabClasses="bg-white text-purple-600 border-b-2 border-purple-600"
        inactiveTabClasses="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        topic={topic}
        setTopic={setTopic}
        onHandleInputChange={onHandleInputChange}
      />
     <input
        type="text"
        placeholder="Enter your topic"
        value={topic}
        onChange={(e) => {setTopic(e.target.value); onHandleInputChange('topic',e.target.value)}}
        className="border p-2 w-full mb-4"
      />
  
     {ideas?.length<=0 && <button
        onClick={handleGenerateIdeas}
        disabled={loading? true: false}
        className={`${loading ? 'bg-gray-800': 'bg-black cursor-pointer'} 
        text-white px-4 py-2 rounded`}>
        {loading ? 'Generating Ideas': 'Generate Idea'}
      </button>}

      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-6 space-y-3 flex justify-between gap-6">
        {ideas.length>0&&ideas.map((idea, index) => (
          <li
            key={index}
            className={`w-[20rem] h-[7rem] p-2 cursor-pointer border-1 line-clamp-4 hover:bg-gray-100 rounded 
              ${selectedIdeaIndex === index && 'border-red-500'}`}
            onClick={() => {handleIdeaClick(idea); setSelectedIdeaIndex(index);
              onHandleInputChange('script',idea)
            }}
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
  )
}

export default Topic