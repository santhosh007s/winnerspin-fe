"use client"

import { Star, Gift, Zap } from "lucide-react"

export function Rewards() {
  return (
    <section
      id="rewards"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-orange-950/20 to-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
              Exclusive Member{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                Rewards
              </span>
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Gift className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Guaranteed Welcome Gift</h3>
                  <p className="text-gray-400">Every new member gets an exclusive welcome gift worth ₹500+</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Star className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Special Monthly Draws</h3>
                  <p className="text-gray-400">Participate in exclusive draws with premium prizes every month</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Bonus Multipliers</h3>
                  <p className="text-gray-400">Earn bonus entries and multiply your winning chances</p>
                </div>
              </div>
            </div>

            <button className="mt-8 px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-600 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition">
              Claim Your Rewards
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-400/30 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="text-center py-6 border-b border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">MEMBER TIER</p>
                  <p className="text-3xl font-bold text-yellow-400">Gold Member</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-400">5x</p>
                    <p className="text-gray-400 text-sm">Entry Bonus</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-500">24/7</p>
                    <p className="text-gray-400 text-sm">Support</p>
                  </div>
                </div>

                <button className="w-full py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400/10 transition">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
