"use client";
import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about-us" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background gradient rays */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Swapped order here */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-30 items-center">
          {/* Founder Message */}
          <div>
            <div className="mb-6">
              <h3 className="text-yellow-200 text-sm font-bold uppercase tracking-widest mb-2">
                Empowering Smarter Savings
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                About Winnerspin
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Winnerspin is redefining how India saves and grows wealth. We
                bring together the safety of disciplined saving with the
                excitement of winning rewards — helping individuals turn
                everyday savings into opportunities for growth.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed ">
                Our platform is built on trust, transparency, and purpose —
                empowering every saver to stay consistent, earn more, and
                achieve financial freedom in a smarter, more rewarding way.{" "}
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold text-yellow-200"> Our Mission:</span>{" "}
                To make saving simple, secure, and rewarding for every
                individual — turning financial discipline into a habit that
                builds lasting value.
              </p>

              {/* <div className="pt-4">
                <p className="text-yellow-200 font-bold text-lg">
                  Founder & CEO, Winnerspin
                </p>
              </div> */}
            </div>
          </div>

          {/* Founder Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-10 bg-gradient-to-br from-yellow-500/10 to-orange-500 rounded-2xl blur-2xl opacity-30" />
              <div className="relative h-full md:w-140 md:h-140 rounded-2xl overflow-hidden border border-yellow-500/20 shadow-2xl shadow-yellow-500/30">
                <Image src="/office.jpg" alt="Founder & CEO" width={560} height={560} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
