import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import styles from "./../styles/Explore.module.css";
import ExploreElement from "./components/ExploreElement";

export default function Explore() {
  return (
    <div className="bg-black">
      <Navbar />
      <ExploreElement />
    </div>
  );
}
