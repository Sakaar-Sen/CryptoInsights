import React from 'react';
import { useEffect, useState } from 'react';


function Chatbot() {
    const [userInput, setUserInput] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [botResponse, setBotResponse] = useState("Hello, I'm Eva! your dedicated AI chatbot for navigating the world of cryptocurrency & finance. How can I be of service to you today?");
    const [showChatbot, setShowChatbot] = useState(false);

    const getBotResponse = async () => {
        if (!userInput) return;
        setBotResponse("Thinking...");
        const response = await fetch("/api/ask", {
            method: "POST",
            body: JSON.stringify({ question: userInput }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setUserMessage(userInput);
        setUserInput("");
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
                        className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center m-4"
                    >
                        <p>🤖</p>
                    </button>
                </div>
                {showChatbot && (
                    <div className={`bg-gray-800 rounded-lg shadow-lg w-96`}>
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col flex-grow">
                                <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
                                    {userMessage && (
                                        <div className="flex flex-col mb-4">
                                            <span className="text-gray-400 text-sm">
                                                You
                                            </span>
                                            <span className="text-white bg-gray-700 rounded-lg px-3 py-2 text-sm mt-2">
                                                {userMessage}
                                            </span>
                                        </div>
                                    )}
                                    {botResponse && (
                                        <div className="flex flex-col mb-4">
                                            <span className="text-gray-400 text-sm">
                                                Eva
                                            </span>
                                            <span className="text-white bg-gray-700 rounded-lg px-3 py-2 text-sm mt-2">
                                                {botResponse}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center px-4 py-2">
                                    <input
                                        type="text"
                                        className="bg-gray-700 rounded-full w-full px-4 py-2 text-white"
                                        placeholder="Type a message..."
                                        value={userInput}
                                        onChange={(e) =>
                                            setUserInput(e.target.value)
                                        }
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button
                                        onClick={getBotResponse}
                                        className="flex items-center justify-center bg-gray-700 rounded-full w-12 h-12 ml-4"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
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