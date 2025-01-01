"use client";
import { useState } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCardDelivery } from "@/ui/food-card-delivery";
import { usePathname, useRouter } from "next/navigation";
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
    { id: "appetizer", label: "Appetizer" },
    { id: "sushi", label: "Sushi" },
    { id: "nigiri", label: "Nigiri" },
    { id: "sashimi", label: "Sashimi" },
    { id: "gunkan", label: "Gunkan" },
    { id: "yakimono", label: "Yakimono" },
    { id: "nabemono", label: "Nabemono" },
    { id: "lunchbox", label: "Lunch Box" },
    { id: "desserts", label: "Desserts" },
    { id: "drink", label: "Drink" },
];

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

interface DeliveryItem {
  title: string;
  price: number;
}

interface CartItem extends DeliveryItem {
    quantity: number
}

type CategoryKeys = keyof typeof menuItems;

export default function DeliveryPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderView, setShowOrderView] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKeys>("appetizer");

  const filteredMenuItems = menuItems[activeCategory].filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const itemsToRender = searchTerm ? filteredMenuItems : menuItems[activeCategory];

  const handleAddToCart = (item: DeliveryItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.title === item.title);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

  const calculateTotal = () => {
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

    const handleCategoryClick = (id: string) => {
          setActiveCategory(id as CategoryKeys);
      };

  return (
    <div>
      <Header/>

      <main className="flex-1">
        <div className="home-contentGroup home-contentGroup1">
          <div className="delivery-container">
            <div className="delivery-sidebar">
              <div className="delivery-categories">
                  {deliveryLinks.map((link) => (
                  <div
                    key={link.id}
                    onClick={() => handleCategoryClick(link.id)}
                      className={`delivery-category ${activeCategory === link.id ? "delivery-active-category" : ""}`}
                  >
                    {link.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="delivery-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="delivery-search-bar">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="delivery-search-input"
                />
              </div>
                <div className="delivery-grid">
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
                                       <h3 style={{textAlign: 'left'}}>{item.title}</h3>
                                          <div style={{textAlign: 'right'}}>
                                             <p style={{margin: 0}}>{item.price.toLocaleString()} VND</p>
                                           <p style={{fontSize: '0.8rem', margin: 0}}>x {item.quantity}</p>
                                        </div>
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