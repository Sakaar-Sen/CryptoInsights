import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function chatbot() {

  const [userMessage, setUserMessage] = useState("")
  const [botMessage, setBotMessage] = useState("")

  const sendMessage = async () => {
    setBotMessage("...")
    try {
      const url = "/api/ask";
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ question: userMessage }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setBotMessage(data.answer)
    }
    catch (error) {
      setBotMessage("Unable to connect to the server. Please try again!")
    }
  }

    return (
      <div>
        <Navbar />
        <input type="text" className="text-black text-2xl" onChange={(event) => setUserMessage(event.target.value)} value={userMessage} placeholder="Say something" />
        <button className="border-solid border-2 border-white text-2xl text-white" onClick={sendMessage}>Send</button>
        <p className="text-white text-2xl">{botMessage}</p>
      </div>
    );
  }
