"use client";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar'; 
import "@/styles/home.css"
import { useRouter } from "next/navigation";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];

export function Header() {
  const router = useRouter();
  return (
    <div id="header">
      <Image
        className="header-logo"
        src="/logoSuShiX.svg"
        alt="Next.js logo"
        width={180}
        height={40}
        priority
      />
      <Sidebar links={tabs}/>
      <div>
        <button className="header-btn" onClick={() => router.push("/signin")}>
            Sign In
        </button>
      </div>
    </div>
);
}

export default function Home() {
  return (
    <div>
      <Header/>
      
      <main className="flex-1 p-4">
        <h1>Welcome to the Page</h1>
        {/* Nội dung trang của bạn */}
      </main>
    </div>
  );
};
