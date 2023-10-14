"use client";
import React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Chatbot() {
    const [userInput, setUserInput] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [botResponse, setBotResponse] = useState("Hello, I'm Eva! your dedicated AI chatbot for navigating the world of cryptocurrency & finance. How can I be of service to you today?");
    const [showChatbot, setShowChatbot] = useState(false);

    const getBotResponse = async () => {
        if (!userInput) return;
        setUserMessage(userInput);
        setUserInput(""); 
        setBotResponse("Thinking...");
    
        const response = await fetch("/api/ask", {
            method: "POST",
            body: JSON.stringify({ question: userInput }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    
        const data = await response.json();
        setBotResponse(data.answer);
    
    };




    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setUserMessage(userInput);
            getBotResponse();
        }
    };

    const toggleButton = () => {
        setShowChatbot(!showChatbot);
    };


    return (
        <div className="fixed md:bottom-10 md:right-10 bottom-5 right-5 z-50">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
                        onClick={toggleButton}
                        className="bg-gray-600 text-white rounded-full w-12 h-12 flex items-center justify-center m-4"
                    >
                        <p>🤖</p>
                    </button>
                </div>
                {showChatbot && (
                    <div className="bg-gray-400 rounded-lg shadow-lg w-96 pb-4">
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col flex-grow">
                                <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
                                    {userMessage && (
                                        <div className="flex flex-col mb-4">
                                            <span className="text-gray-100 text-sm">
                                                You
                                            </span>
                                            <span className="text-black bg-gray-300 rounded-lg px-3 py-2 text-sm mt-2">
                                                {userMessage}
                                            </span>
                                        </div>
                                    )}
                                    {botResponse && (
                                        <div className="flex flex-col mb-4">
                                            <span className="text-gray-100 text-sm">
                                                Eva
                                            </span>
                                            <span className="text-black bg-gray-300 rounded-lg px-3 py-2 text-sm mt-2">
                                                {botResponse}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center px-4 py-2">
                                    <input
                                        type="text"
                                        className="bg-gray-500 rounded-full w-full px-4 py-2 text-white"
                                        placeholder="Type a message..."
                                        value={userInput}
                                        onChange={(e) =>
                                            setUserInput(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button
                                        onClick={getBotResponse}
                                        className="flex items-center justify-center bg-gray-500 rounded-md w-12 h-10 ml-4"
                                    >   
                                        <p>🚀</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default Chatbot;