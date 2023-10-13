"use client";
import Link from "next/link";
import React from "react";
import styles from "./homepage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className="flex center items-center flex-col-reverse gap-6 md:flex-row md:gap-32">
        <div className="text-white flex-column align-middle text-center center">
          <p className="text-white text-3xl md:text-6xl">CRYPTO INSIGHTS</p>
          <p className="text-1xl md:text-[1.4rem] mt-6 mb-6">
            Your go to place for crypto information
          </p>
          <div className=" flex center items-center justify-center gap-12">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-1xl md:text-1xl font-bold py-2 px-4 rounded-full">
              Get Started
            </button>

            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white text-[1rem] md:text-1xl font-bold py-2 px-4 rounded-full">
              Docs
            </button> */}
          </div>
        </div>
        <img src="logo.png" className="min-w-[10rem] md:min-w-[25rem]" />
      </div>
    </div>
  );
};

export default HomePage;
