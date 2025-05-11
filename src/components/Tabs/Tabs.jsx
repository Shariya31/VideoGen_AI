import React, { useState } from 'react'

const Tabs = ({ tabs, defaultTab = 0, tabListClasses, tabButtonClasses, activeTabClasses, inactiveTabClasses, contentClasses, topic:suggestion, setTopic, onHandleInputChange }) => {

    const [activeTab, setActiveTab] = useState(defaultTab)
    return (
        <div>
            <div className={tabListClasses}>

            {tabs.map((tab, index) => (
                <button 
                    key={index}
                    className={`${tabButtonClasses} ${activeTab === index ? activeTabClasses : inactiveTabClasses}`}
                    onClick={()=>setActiveTab(index)}
                >    
                {tab.label}
                </button>
            ))}
            </div>
            <div className={contentClasses}>
                {tabs[activeTab].content.map((topic, index)=>(
                    <button className={`border-1 border-white py-2 px-4 my-4 rounded-xl 
                    bg-black text-white hover:bg-gray-700 
                    ease-in-out duration-300 cursor-pointer ${topic === suggestion && 'bg-gray-700'}`} key={index} onClick={()=>{setTopic(topic);onHandleInputChange('topic',topic)}}>{topic}</button>
                ))}
            </div>
        </div>
    )
}

export default Tabs