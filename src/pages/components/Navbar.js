"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  // useEffect(() => {
  //   const changeColor = () => {
  //     if (window.scrollY >= 190) {
  //       setColor('#000000');
  //       setTextColor('#ffffff');
  //     } else {
  //       setColor('#000000');
  //       setTextColor('#ffffff');
  //     }
  //     console.log(window.scrollY);
  //   };
  //   window.addEventListener('scroll', changeColor);
  // }, []);


  return (
    <div
      className={
        "left-0 top-0 w-full z-10 ease-in duration-30 bg-gray-900 bg-opacity-50 backdrop-blur-sm" +
        " fixed "
      }
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center py-2 px-4  text-white">
        <Link href="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-2xl ">
            Crypto Insights
          </h1>

          {/* <Image src="/logo3.png" width={50} height={50} className=""/> */}
        </Link>
        <ul
          style={{ color: `${textColor}` }}
          className="hidden sm:flex align-middle"
        >
          <li className="py-2 px-4">
            <Link href="/" className="hover:text-gray-300 duration-150">
              Home
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/explore" className="hover:text-gray-300 duration-150">
              Explore
            </Link>
          </li>
          <li className="py-2 px-4 ">
            <Link
              href="/analytics"
              className="hover:text-gray-300 duration-150"
            >
              Analytics
            </Link>
          </li>
        
          <li className="py-2 px-4 ">
            <Link href="/news" className="hover:text-gray-300 duration-150">
              News
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-50">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: "" }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500 z-10"
            >
              <Link href="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/explore">Explore</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/analytics">Analytics</Link>
            </li>
        
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link href="/news">News</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
