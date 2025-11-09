"use client"

import { Trophy, Home, Zap, Gift, Coins, Sparkles } from "lucide-react"

const prizes = [
  {
    icon: Coins,
    title: "Gold & Jewelry",
    description: "Premium gold coins and exclusive jewelry pieces",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    icon: Home,
    title: "Home Appliances",
    description: "Latest smart home devices and appliances",
    color: "from-orange-400 to-orange-600",
  },
  {
    icon: Trophy,
    title: "Luxury Vehicles",
    description: "Brand new cars and two-wheelers",
    color: "from-red-400 to-orange-600",
  },
  {
    icon: Zap,
    title: "Cash Rewards",
    description: "Direct cash prizes up to ₹5 lakhs",
    color: "from-yellow-300 to-orange-500",
  },
  {
    icon: Gift,
    title: "Exclusive Gifts",
    description: "Premium gift hampers and vouchers",
    color: "from-pink-400 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Mystery Prizes",
    description: "Surprise rewards worth up to ₹10 lakhs",
    color: "from-purple-400 to-pink-500",
  },
]

export function Prizes() {
  return (
    <section id="prizes" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 text-balance">Exciting Prizes Await</h2>
          <p className="text-xl text-gray-400">Every save brings you closer to winning amazing rewards</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map((prize, index) => {
            const Icon = prize.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-yellow-400/50 transition overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prize.color} opacity-0 group-hover:opacity-10 transition duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${prize.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{prize.title}</h3>
                  <p className="text-gray-400">{prize.description}</p>

                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-yellow-400 font-semibold text-sm">Claim your chance →</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
