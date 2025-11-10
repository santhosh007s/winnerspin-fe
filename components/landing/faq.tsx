"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle, Gift, Users, Calendar, CreditCard, Shuffle, Bell, Ban, XCircle } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

const faqs = [
  {
    icon: Gift,
    question: "What is the Winnerspin Loyalty Draw?",
    answer:
      "Winnerspin Loyalty Draw is an exclusive monthly program for our loyal customers. By joining the loyalty plan, members get a chance to win exciting prizes such as gold, silver, home appliances, sarees, and mystery gifts every month.",
  },
  {
    icon: Calendar,
    question: "When is the draw conducted?",
    answer:
      "The draw is conducted every month after the 20th, on a Sunday. The exact date and time will be announced in advance through our official communication channels.",
  },
  {
    icon: CreditCard,
    question: "How can I become eligible for the draw?",
    answer:
      "To qualify for the monthly draw, you must pay ₹1000 before the 20th of the month. This makes you an active participant in that month’s Winnerspin Loyalty Draw.",
  },
  {
    icon: Users,
    question: "Can I attend the draw in person?",
    answer:
      "Yes! All participants are welcome to attend the event offline at our Winnerspin venue. If you can’t attend in person, you can watch the live draw on our official YouTube channel.",
  },
  {
    icon: Shuffle,
    question: "How are winners selected?",
    answer:
      "All eligible participants are entered into a randomized digital draw system. The selection process is conducted transparently, in front of the audience, and live-streamed on YouTube.",
  },
  {
    icon: Bell,
    question: "How will I know if I’ve won?",
    answer:
      "Winners will be announced live during the draw and later updated on our official social media pages. All winners will also receive a confirmation call or message from the Winnerspin team.",
  },
  {
    icon: Ban,
    question: "Can I transfer my prize to someone else?",
    answer:
      "No. Prizes are non-transferable and must be claimed by the registered customer who participated in that month’s draw.",
  },
  {
    icon: XCircle,
    question: "Is the ₹1000 refundable if I don’t win?",
    answer:
      "No. The ₹1000 is a participation amount for the loyalty draw and is non-refundable. It grants you eligibility for that month’s draw.",
  },
];

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-yellow-500/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <HelpCircle className="text-yellow-500" size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-yellow-400 text-lg">Everything you need to know about Winnerspin</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const IconComponent = faq.icon
            return (
              <div key={index} className="group">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-start gap-4 p-6 bg-gradient-to-r from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-lg hover:border-yellow-500/50 transition-all duration-300 text-left"
                >
                  <IconComponent className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={24}
                    className={`text-yellow-500 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-6 bg-yellow-500/5 border-x border-b border-yellow-500/20 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg text-center">
          <p className="text-white mb-4">Still have questions? We&apos;re here to help!</p>
          <a
            href="https://wa.me/9686915509"
            className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
