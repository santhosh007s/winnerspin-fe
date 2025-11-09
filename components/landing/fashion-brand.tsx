"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function FashionBrand() {
  const collections = [
    {
      name: "Festive Sarees",
      image: "/saree.png",
    },
    {
      name: "Sherwanis",
      image: "/sherwani.png",
    },
    {
      name: "Kurta Sets",
      image: "/kurta.png",
    },
    {
      name: "Lehengas",
      image: "/lehanga.png",
    },
  ];

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-yellow-500 text-sm font-bold uppercase tracking-widest mb-4">
            Beyond Savings
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Other Ventures
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover Spin & Co, our premium clothing brand designed for festivals and functions, celebrating elegance, culture, and craftsmanship.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 px-4 ">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden rounded-lg border border-yellow-500/30 group-hover:border-yellow-500/60 transition-all duration-300">
              <Image 
                src={collection.image || "/placeholder.svg"} width={400} height={320}
                alt={collection.name} 
                className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-500"
              />
              
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-yellow-400 font-bold text-lg">
                  {collection.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center w-full flex justify-center">
        <button disabled={true} className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold text-lg rounded-lg bg-yellow-400/10 transition flex justify-center items-center gap-2">
            Coming Soon Online <ArrowRight size={20} />
          </button>
        </div>

        {/* Brand Message */}
        <div className="mt-16 p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg text-center">
          <p className="text-white text-lg leading-relaxed">
            Spin & Co is a clothing brand that blends tradition with modern
            fashion. Every piece is crafted with care, combining quality,
            comfort, and culture. After earning trust through our offline
            stores, we’re now bringing the same experience online soon — so you
            can shop your favourite styles with ease and confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
