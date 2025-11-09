"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/public/Logo-WS.png";
import Link from "next/link";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="nav w-full z-50 fixed top-[3%] lg:top-[4%] xl:top-[4%] 2xl:top-[5%] flex items-center justify-center">
      <div
        className="min-w-80 w-[95%] h-15 sm:w-[70%] md:h-[68px] xl:w-[50%] 
        bg-black/10 backdrop-blur-3xl px-[10px] py-3 
        flex md:gap-20 items-center justify-between 
        rounded-4xl border-[1px] sm:border-[0.5px] border-white/50 sm:border-white/50"
      >
        <div className="flex-1 flex items-center">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="logo"
            height={40}
            width={160} // Aspect ratio from original image
            className="h-12 mb-1 sm:h-14 md:h-16 w-auto"
          />
        </Link>
        </div>

        <div className="hidden sm:flex flex-1 justify-center items-center gap-x-8 md:gap-x-12 md:text-lg font-bold">
          <button
            onClick={() => handleScroll("about-us")}
            className="text-nowrap bg-clip-text text-transparent cursor-pointer hidden lg:block bg-gradient-to-b hover:scale-102 from-yellow-300 to-orange-500 text-xl"
          >
            About us
          </button>
          <button
            onClick={() => handleScroll("contact-cta")}
            className="text-nowrap bg-clip-text text-transparent cursor-pointer hidden md:block bg-gradient-to-b hover:scale-102 from-yellow-300 to-orange-500 text-xl"
          >
            Contact us
          </button>
        </div>
        <div className="relative flex-1 flex justify-end" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="max-w-40 min-h-10 bg-gradient-to-br cursor-pointer border border-orange-200 from-yellow-300 to-orange-600 hover:scale-105 transition-transform duration-300 hover:bg-white w-28 sm:w-25 sm:h-10 h-8 rounded-3xl flex justify-center items-center"
          >
            <button className=" font-bold text-neutral-50 tracking-wide cursor-pointer px-4">
              Login
            </button>
          </div>
          {isDropdownOpen && (
            <div
              className="absolute -right-4 top-full mt-4 w-36 bg-black backdrop-blur-lg saturate-150 border border-white/20 rounded-lg shadow-lg"
            >
              <ul className="py-2">
                <li>
                  <Link href="/user/login" className="block px-4 py-2 text-white hover:bg-white/5">Customer</Link>
                </li>
                <li>
                  <Link href="/promoter/login" className="block px-4 py-2 text-white hover:bg-white/5">Promoter</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
