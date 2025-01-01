"use client";
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCardDelivery } from "@/ui/food-card-delivery";
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

interface MenuItem {
    title: string;
    price: number;
}

export default function MenuPage() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState<MenuItem[]>([]);
    const [showOrderView, setShowOrderView] = useState(false);

    const filteredMenuItems = menuItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const itemsToRender = searchTerm ? filteredMenuItems : menuItems;
    const handleAddToCart = (item: MenuItem) => {
      setCart([...cart, item]);
    };
    const handleToggleOrderView = () => {
      setShowOrderView(!showOrderView);
    };

    const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div>
            <div id="home-header">
                <Image
                    className="home-logo"
                    src="/logoSuShiX.svg"
                    alt="Next.js logo"
                    width={180}
                    height={40}
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

                       <div className="menu-content" style={{display: "flex", flexDirection: "column"}}>
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
                                          <div className={`menu-grid ${showOrderView ? 'two-column-grid': '' }`}>
                                              {itemsToRender.map((item, index) => (
                                                  <FoodCardDelivery key={index} {...item} onAddToCart={handleAddToCart}/>
                                              ))}
                                          </div>
                                      ) : (<div className="menu-grid">No item found</div>)
                                    }
                            </div>
                      {showOrderView && (
                        <div className="order-view">
                           <h2>My Order</h2>
                               {cart.map((item, index) => (
                                <div key={index} className={"order-item"}>
                                   <div className={"order-item-info"}>
                                   <Image src={"/tofu.png"} alt={item.title} width={50} height={50} />
                                   <h3>{item.title}</h3>
                                   <p>${item.price}</p>
                                    </div>
                                </div>
                                 ))}
                             <div className="order-total">Total Amount: ${calculateTotal()}</div>
                            <button className="order-button">Order</button>
                        </div>
                            )}
                           <button onClick={handleToggleOrderView}  className="order-view-button">{showOrderView ? "Close Order" : "Open Order"}</button>
                    </div>
                </div>
            </main>
        </div>
    );
}