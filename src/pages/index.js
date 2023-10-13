import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import styles from "./../styles/homepage.module.css"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar pos="fixed"/>
      <div className={styles.container}>
        <div className="flex center items-center flex-col-reverse gap-6 md:flex-row md:gap-32">
          <div className="text-white flex-column align-middle text-center center md:mr-[14rem] lg:mr-[36rem]">
            <p className="text-white text-4xl md:text-8xl font-bold tracking-[.3rem]">Crypto Insights</p>
            <p className="text-[1.2rem] md:text-[1rem] mt-6 mb-6 font-semibold tracking-[.2rem]">Tracking over 100+ cryptocurrencies using 15+ unique metrics</p>
            <div className=" flex center items-center justify-center gap-12">
              {/* <a className="px-8 py-3 rounded-md bg-blue-400 text-black hover:bg-blue-300 font-bold tracking-wide duration-200 transition-all cursor-pointer" href="/analytics">
                Get Started
              </a> */}
            </div>
          </div>
          
        </div>
      </div>
    </div>

  );
}
