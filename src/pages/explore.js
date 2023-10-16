import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import styles from "./../styles/Explore.module.css";
import ExploreElement from "./components/ExploreElement";

export default function Explore() {
  return (
    <div
      className="bg-black"
      style={{
        backgroundImage: "url(./../../q7.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <div className="z-0">
        <div className="flex justify-center items-center">
          <h1 className="text-5xl text-gray-100 font-bold mt-12 mb-4 tracking-wide">
            Explore
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-gray-300 text-xl mb-8">
            The most popular cryptocurrencies at your fingertips!
          </p>
        </div>
        <ExploreElement />
      </div>
    </div>
  );
}
