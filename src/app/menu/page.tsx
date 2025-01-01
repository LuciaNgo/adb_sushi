"use client";
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCard } from "@/ui/food-card";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/home.css";
import "@/styles/menu.css";

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

const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/menu" },
    { id: "booking", label: "Booking", path: "/booking" },
    { id: "delivery", label: "Delivery", path: "/delivery" },
    { id: "about", label: "About", path: "/about" },
];

const menuLinks = [
    { id: "appetizer", label: "Appetizer"},
    { id: "sushi", label: "Sushi"},
    { id: "nigiri", label: "Nigiri"},
    { id: "sashimi", label: "Sashimi"},
    { id: "gunkan", label: "Gunkan"},
    { id: "yakimono", label: "Yakimono"},
    { id: "nabemono", label: "Nabemono"},
    { id: "lunchbox", label: "Lunch Box"},
    { id: "desserts", label: "Desserts"},
    { id: "drink", label: "Drink"},
];

// Sample menu items data
const menuItems = {
    appetizer: [
        { title: "Fish and Veggie", price: 120000 },
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
        { title: "Tofu Chili", price: 135000 },
        { title: "Egg and Cucumber", price: 45000 },
        { title: "Fish and Veggie", price: 90000 },
        { title: "Tofu Chili", price: 180000 },
        { title: "Fish and Veggie", price: 80000 },
    ],
    sushi: [
        { title: "Fish and Veggie", price: 120000 },
    ],
    nigiri: [
        { title: "Fish and Veggie", price: 120000 },
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 80000 },
    ],
    sashimi: [
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
    ],
    gunkan: [
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
        { title: "Fish and Veggie", price: 345000 },
    ],
    yakimono: [
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
    ],
    nabemono: [
        { title: "Tofu Chili", price: 160000 },
        { title: "Fish and Veggie", price: 345000 },
    ],
    lunchbox: [
        { title: "Egg and Cucumber", price: 100000 },
        { title: "Fish and Veggie", price: 345000 },
    ],
    desserts: [
        { title: "Tofu Chili", price: 160000 },
        { title: "Egg and Cucumber", price: 100000 },
    ],
    drink: [
        { title: "Fish and Veggie", price: 345000 },
    ]
};

interface menuItem {
  title: string;
  price: number;
  category: string;
}

type CategoryKeys = keyof typeof menuItems;

export default function MenuPage() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<CategoryKeys>("appetizer"); // Default category

    const filteredMenuItems = menuItems[activeCategory].filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const itemsToRender = searchTerm ? filteredMenuItems : menuItems[activeCategory];


    const handleCategoryClick = (id: string) => {
          setActiveCategory(id as CategoryKeys);
      };

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
                         onClick={() => handleCategoryClick(link.id)}
                         className={`menu-category ${activeCategory === link.id ? "menu-active-category" : ""}`}
                   >
                    {link.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="menu-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
                <div className="menu-grid">
                    {itemsToRender.map((item, index) => (
                       <FoodCard
                          key={index}
                         {...item}
                     />
                  ))}
                 </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}