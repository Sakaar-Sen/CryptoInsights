import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import styles from "./../styles/Explore.module.css";
import ExploreElement from "./components/ExploreElement";
import Chatbot from "./components/ChatBot";

export default function Explore() {
  return (
    <div
      className="min-h-[100vh]"
      style={{
        backgroundImage: "url(./../../q7.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <div className="p-12">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl text-gray-100 text-center font-bold mt-12 mb-4 tracking-wide" style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}>
            Explore
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-gray-300 text-center text-l md:text-xl mb-8"  style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}>
            The most popular cryptocurrencies at your fingertips!
          </p>
        </div>
        <ExploreElement />
        <Chatbot />
      </div>
    </div>
  );
}
