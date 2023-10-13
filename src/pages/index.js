import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import HomePage from "./components/Homepage";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}
