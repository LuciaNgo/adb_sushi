// app/menu/page.tsx
"use client";
import { useState, useEffect } from "react";
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
    { id: "appetize", label: "Appetizer"},
    { id: "sushi", label: "Sushi"},
    { id: "nigiri", label: "Nigiri"},
    { id: "sashimi", label: "Sashimi"},
    { id: "gunkan", label: "Gunkan"},
    { id: "yakimono", label: "Yakimono"},
    { id: "nabemono", label: "Nabemono"},
    { id: "lunch box", label: "Lunch Box"},
    { id: "desserts", label: "Desserts"},
    { id: "drink", label: "Drink"},
];


interface menuItem {
  id: string;
  title: string;
  price: number;
  category: string;
}

type CategoryKeys =  "appetize" | "sushi" | "nigiri" | "sashimi" | "gunkan" | "yakimono" | "nabemono" | "lunch box" | "desserts" | "drink" ;

export default function MenuPage() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<CategoryKeys>("appetize");
    const [menuItems, setMenuItems] = useState<menuItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
       const fetchMenuItems = async () => {
         setIsLoading(true);
         setError(null);
         try {
           const response = await fetch(`/api/menu?category=${activeCategory}`);
           if (!response.ok) {
             throw new Error(`HTTP error! status: ${response.status}`);
           }
             const data = await response.json();
             setMenuItems(data);
         }
         catch (error: any) {
           console.error("Failed to fetch menu items", error);
             setError(error.message || "Failed to fetch menu data");
          } finally {
           setIsLoading(false);
         }
       };
        fetchMenuItems();
     }, [activeCategory]);

    const filteredMenuItems = menuItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

   const itemsToRender = searchTerm ? filteredMenuItems : menuItems;

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
               {isLoading && <p>Loading menu items...</p>}
               {error && <p style={{color: 'red'}}>Error: {error}</p>}
                <div className="menu-grid">
                    {itemsToRender.map((item) => (
                      <FoodCard
                        key={item.id}
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