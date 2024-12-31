"use client";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCard } from "@/ui/food-card";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
    { title: "Egg and Cucumber", price: 12 },
    { title: "Fish and Veggie", price: 12 },
    { title: "Fish and Veggie", price: 12 },
    { title: "Tofu Chili", price: 12 },
    { title: "Egg and Cucumber", price: 12 },
    { title: "Fish and Veggie", price: 12 },
    { title: "Tofu Chili", price: 12 },
    { title: "Egg and Cucumber", price: 12 },
    { title: "Fish and Veggie", price: 12 },
    { title: "Tofu Chili", price: 12 },
];

export const theme = {
    selectionColor: "transparent",
    hoverBgColor: "transparent",
    color: "inherit",
    backgroundColor: "transparent",
};

export default function MenuPage() {
    const pathname = usePathname();

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
                <Sidebar links={tabs} />
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
