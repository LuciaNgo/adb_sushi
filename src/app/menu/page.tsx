"use client";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar'; 
import "@/styles/home.css"

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];

export default function Home() {
  return (
    <div>
        <div id="home-header">
          <Image
            className="home-logo"
            src="/logoSuShiX.svg"
            alt="Next.js logo"
            width={198}
            height={55}
            priority
          />
          <Sidebar links={tabs}/>
          <div>
            <button id="signIn" className="home-btn">
                Sign In
            </button>
            <button id="signUp" className="home-btn">
                Sign Up
            </button>
          </div>
        </div>
        
        <main className="flex-1 p-4">
          <h1>Welcome to the Page</h1>
          {/* Nội dung trang của bạn */}
        </main>
    </div>
  );
}
