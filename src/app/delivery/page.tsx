"use client";
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCardDelivery } from "@/ui/food-card-delivery";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "@/styles/home.css";
import "@/styles/delivery.css";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];

const deliveryLinks = [
  { id: "appetizer", label: "Appetizer", path: "/delivery" },
  { id: "sushi", label: "Sushi", path: "/delivery/sushi" },
  { id: "nigiri", label: "Nigiri", path: "/delivery/nigiri" },
  { id: "sashimi", label: "Sashimi", path: "/delivery/sashimi" },
  { id: "gunkan", label: "Gunkan", path: "/delivery/gunkan" },
  { id: "yakimono", label: "Yakimono", path: "/delivery/yakimono" },
  { id: "nabemono", label: "Nabemono", path: "/delivery/nabemono" },
  { id: "lunchbox", label: "Lunch Box", path: "/delivery/lunchbox" },
  { id: "desserts", label: "Desserts", path: "/delivery/desserts" },
  { id: "drink", label: "Drink", path: "/delivery/drink" },
];

const deliveryItems = [
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

interface deliveryItem {
  title: string;
  price: number;
}

export default function DeliveryPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<deliveryItem[]>([]);
  const [showOrderView, setShowOrderView] = useState(true); // Always show order view

  const filtereddeliveryItems = deliveryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const itemsToRender = searchTerm ? filtereddeliveryItems : deliveryItems;

  const handleAddToCart = (item: deliveryItem) => {
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
          <div className="delivery-container">
            <div className="delivery-sidebar">
              <div className="delivery-categories">
                {deliveryLinks.map((link) => (
                  <div
                    key={link.id}
                    className={`delivery-category ${
                      pathname === link.path ? "active-category" : ""
                    }`}
                  >
                    <Link href={link.path}>{link.label}</Link>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="delivery-content" >
              <div className="delivery-search-bar">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="delivery-search-input"
                />
              </div>
                <div className="delivery-grid" >
                    {itemsToRender.map((item, index) => (
                       <FoodCardDelivery
                          key={index}
                         {...item}
                         onAddToCart={handleAddToCart}
                     />
                  ))}
                 </div>
            </div>
         
              <div className="delivery-order-view">
                     <h2>Order Cart</h2>
                     {cart.map((item, index) => {
                           const imagePath = `/${item.title
                                   .toLowerCase()
                                   .replace(/\s+/g, "_")}.svg`;
                           return (
                               <div key={index} className={"delivery-order-item"}>
                                    <div className={"delivery-order-item-info"}>
                                       <Image
                                       src={imagePath}
                                        alt={item.title}
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover"
                                       />
                                       <h3>{item.title}</h3>
                                        <p>{item.price.toLocaleString()} VND</p>
                                      </div>
                                 </div>
                            );
                     })}
                 <div className="delivery-order-total">
                        Total Amount: {calculateTotal().toLocaleString()} VND
                    </div>
                     <button className="delivery-order-button">Order</button>
                </div>
           
          </div>
        </div>
      </main>
    </div>
  );
}