"use client";
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCard } from "@/ui/food-card";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "@/styles/home.css";
import "@/styles/menu.css";
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



const menuLinks = [
    { id: "appetizer", label: "Appetizer", path: "/menu" },
    { id: "sushi", label: "Sushi", path: "/menu/sushi" },
    { id: "nigiri", label: "Nigiri", path: "/menu/nigiri" },
    { id: "sashimi", label: "Sashimi", path: "/menu/sashimi" },
    { id: "gunkan", label: "Gunkan", path: "/menu/gunkan" },
    { id: "yakimono", label: "Yakimono", path: "/menu/yakimono" },
    { id: "nabemono", label: "Nabemono", path: "/menu/nabemono" },
    { id: "lunchbox", label: "Lunch Box", path: "/menu/lunchbox" },
    { id: "desserts", label: "Desserts", path: "/menu/desserts" },
    { id: "drink", label: "Drink", path: "/menu/drink" },
];

// Sample menu items data
const menuItems = [
    { title: "Fish and Veggie", price: 120000 },
    { title: "Tofu Chili", price: 160000 },
    { title: "Egg and Cucumber", price: 100000 },
    { title: "Fish and Veggie", price: 345000 },
    { title: "Tofu Chili", price: 135000 },
    { title: "Egg and Cucumber", price: 45000 },
    { title: "Fish and Veggie", price: 90000 },
    { title: "Tofu Chili", price: 180000 },
    { title: "Fish and Veggie", price: 80000 },
];

export const theme = {
    selectionColor: "transparent",
    hoverBgColor: "transparent",
    color: "inherit",
    backgroundColor: "transparent",
};

export default function MenuPage() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMenuItems = menuItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const itemsToRender = searchTerm ? filteredMenuItems : menuItems;

    return (
        <div>
            <Header/>

            <main className="flex-1">
                <div className="home-contentGroup home-contentGroup1">
                    <div className="menu-container">
                         <div className="menu-sidebar">
                            <div className="menu-categories">
                                {menuLinks.map((link) => (
                                     <div
                                         key={link.id}
                                         className={`menu-category ${
                                             pathname === link.path ? "active-category" : ""
                                         }`}
                                     >
                                         <Link href={link.path}>{link.label}</Link>
                                     </div>
                                ))}
                            </div>
                        </div>

                        <div className="menu-content">
                            <div className="search-bar">
                                <input
                                    type="text"
                                    placeholder="Search dishes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                                  {itemsToRender.length > 0 ?
                                      (
                                          <div className="menu-grid">
                                            {itemsToRender.map((item, index) => (
                                                  <FoodCard key={index} {...item} />
                                            ))}
                                         </div>
                                      ) : (<div className="menu-grid">No item found</div>)
                                    }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}