"use client";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCard } from '@/ui/food-card';
import "@/styles/home.css";
import "@/styles/menu.css";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];

const menuLinks = [
  { id: "appetizer", label: "Appetizer", path: "#appetizer" },
  { id: "sushi", label: "Sushi", path: "#sushi" },
  { id: "nigiri", label: "Nigiri", path: "#nigiri" },
  { id: "sashimi", label: "Sashimi", path: "#sashimi" },
  { id: "gunkan", label: "Gunkan", path: "#gunkan" },
  { id: "yakimono", label: "Yakimono", path: "#yakimono" },
  { id: "nabemono", label: "Nabemono", path: "#nabemono" },
  { id: "lunchbox", label: "Lunch Box", path: "#lunchbox" },
  { id: "desserts", label: "Desserts", path: "#desserts" },
  { id: "drink", label: "Drink", path: "#drink" },
];

// Sample menu items data
const menuItems = [
  {
    title: "Fish and Veggie",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    title: "Tofu Chili",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    title: "Egg and Cucumber",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    title: "Fish and Veggie",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    title: "Tofu Chili",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  {
    title: "Egg and Cucumber",
    description: "Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor",
    price: 12,
    image: "/placeholder.svg?height=300&width=300"
  },
  // Add more items as needed
];


export default function MenuPage() {
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
          <button id="signUp" className="home-btn">
              Sign In
          </button>
        </div>
      </div>
            
      <main className="flex-1">  
        <div className="home-contentGroup home-contentGroup1">
          <div className="menu-container">         
            <div className="menu-sidebar">
              <div className="menu-categories">
                {menuLinks.map((link) => (
                  <a key={link.id} href={link.path} className="menu-category">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="menu-grid">
              {menuItems.map((item, index) => (
                <FoodCard key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}