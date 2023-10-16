"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function NewsElement(props) {
  return (
    <a
      href={props.url}
      target="_blank"
      className="md:w-[48rem] hover:scale-105 transition duration-100 relative"
    >
      <div className="text-white backdrop-blur relative z-0 flex items-center justify-start border-slate-400 border-solid border-2 rounded-lg gap-8">
        <div>
          <Image
            alt={props.coin}
            src={"http://sakaarsen.lag.tf/api/image?coin=" + props.coin}
            width={100}
            height={100}
            className=" px-2 md:px-6 py-2 md:py-6 opacity-90"
          />
        </div>
        <div className="pr-2 md:pr-4 text-[0.7rem] md:text-[1rem] text-gray-200">
          {props.text}
          <p className="text-[0.6rem] absolute right-2 md:right-6 bottom-2 md:bottom-3 opacity-70">
            🕑 {props.time}{" "}
          </p>
        </div>
      </div>
    </a>
  );
}

export default NewsElement;
