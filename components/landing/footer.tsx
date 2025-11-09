import { Instagram, MessageCircleMore, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Logo-WS.png";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4 ">
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
            <p className="text-gray-400 text-sm">Turn saving into winning</p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm  ">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Socials</h4>
            <ul className="space-y-2 text-gray-400 text-sm flex flex-col items-center md:items-start">
              <li>
                <a href="https://www.instagram.com/winnerspinofficial" target="_blank"  className="hover:text-yellow-400 transition flex gap-1">
                  <Instagram className="h-4 mt-px" />Instagram 
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition flex gap-1">
                  <MessageCircleMore className="h-4 mt-px" />Whatsapp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition flex gap-1">
                  <Phone className="h-4 mt-px" />Phone
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/terms" className="hover:text-yellow-400 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-yellow-400 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-yellow-400 transition">
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Winnerspin. All rights reserved. | Website & Branding by <a className="text-gray-300 font-bold" target="_blank" href="https://ubuzz.in">UBUZZ</a></p>
        </div>
      </div>
    </footer>
  )
}
