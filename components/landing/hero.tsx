"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
export function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <section className="relative min-h-screen flex items-center justify-center md:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(253,224,71,0.2),_rgba(100,10,12,0.12),_black)] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">


        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-white text-balance">
          Turn Your Savings{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            Into Amazing Gifts!
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-8 text-balance max-w-2xl lg:max-w-3xl mx-auto">
          Join thousands of winners earning amazing rewards while saving. Every rupee saved is a chance to win gold,
          vehicles, cash, and more!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="https://wa.me/9686915509">
          <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-600 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition transform hover:scale-105">
            Join Now
          </button>
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold text-lg rounded-lg hover:bg-yellow-400/10 transition w-full"
            >
              Login
            </button>
            {isDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-full bg-black/50 backdrop-blur-lg saturate-150 border border-white/20 rounded-lg shadow-lg max-w-40"
              >
                <ul className="py-2">
                  <li>
                    <Link href="/user/login" className="block px-4 py-2 text-white hover:bg-white/10">Customer</Link>
                  </li>
                  <li>
                    <Link href="/promoter/login" className="block px-4 py-2 text-white hover:bg-white/10">Promoter</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-yellow-400">50K+</p>
            <p className="text-gray-400 text-sm">Active Winners</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-500">₹10L+</p>
            <p className="text-gray-400 text-sm">Gifts & Rewards</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-400">100%</p>
            <p className="text-gray-400 text-sm">Transparent</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translateY(-20px);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px);
          }
        }
      `}</style>
    </section>
  )
}
