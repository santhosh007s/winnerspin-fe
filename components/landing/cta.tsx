"use client"

import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section id="contact-cta" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-orange-950/30 to-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-600/10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
          Ready to Start{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">Winning?</span>
        </h2>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Your first step towards financial freedom and exciting rewards starts here. Join now and get your welcome
          gift!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-600 text-black font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-yellow-400/50 transition transform hover:scale-105 flex items-center justify-center gap-2">
            Join Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
          </button>
          {/* <button className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold text-lg rounded-lg hover:bg-yellow-400/10 transition">
            Learn More
          </button> */}
        </div>

        <p className="text-gray-400 text-sm">✓ No credit card required • ✓ Instant activation • ✓ 100% secure</p>
      </div>
    </section>
  )
}
