"use client";
import Link from "next/link";
import React from "react";
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className="flex center items-center flex-col-reverse gap-6 md:flex-row md:gap-32">
        <div className="text-white flex-column align-middle text-center center md:mr-[14rem] lg:mr-[36rem]">
          <p className="text-white text-4xl md:text-6xl">CRYPTO INSIGHTS</p>
          <p className="text-[1.2rem] md:text-[1.4rem] mt-6 mb-6">Decode the Crypto Maze</p>
          <div className=" flex center items-center justify-center gap-12">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-1xl md:text-1xl font-bold py-2 px-4 rounded-full">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
