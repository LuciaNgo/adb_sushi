"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCardOrder } from "@/ui/food-card-order";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/home.css";
import "@/styles/order.css";

const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/menu" },
    { id: "booking", label: "Booking", path: "/booking" },
    { id: "delivery", label: "Delivery", path: "/delivery" },
    { id: "about", label: "About", path: "/about" },
];

const orderLinks = [
    { id: "appetize", label: "Appetizer" },
    { id: "sushi", label: "Sushi" },
    { id: "nigiri", label: "Nigiri" },
    { id: "sashimi", label: "Sashimi" },
    { id: "gunkan", label: "Gunkan" },
    { id: "yakimono", label: "Yakimono" },
    { id: "nabemono", label: "Nabemono" },
    { id: "lunch box", label: "Lunch Box" },
    { id: "desserts", label: "Desserts" },
    { id: "drink", label: "Drink" },
];
 

 interface orderItem {
     id: string;
     title: string;
     price: number;
     category: string;
   }

 interface CartItem extends orderItem {
     quantity: number
 }
 
type CategoryKeys =  "appetize" | "sushi" | "nigiri" | "sashimi" | "gunkan" | "yakimono" | "nabemono" | "lunch box" | "desserts" | "drink" ;

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


export default function orderPage() {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderView, setShowOrderView] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryKeys>("appetize");
    const [menuItems, setMenuItems] = useState<orderItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
     const fetchMenuItems = async () => {
       setIsLoading(true);
       setError(null);
        try {
             const response = await fetch(`/api/order?category=${activeCategory}`);
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


  const handleAddToCart = (item: orderItem) => {
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
          <div className="order-container">
            <div className="order-sidebar">
              <div className="order-categories">
                  {orderLinks.map((link) => (
                  <div
                    key={link.id}
                    onClick={() => handleCategoryClick(link.id)}
                      className={`order-category ${activeCategory === link.id ? "order-active-category" : ""}`}
                  >
                    {link.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              className="order-content"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="order-search-bar">
                <input
                  type="text"
                  placeholder="Search dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="order-search-input"
                />
              </div>
              {isLoading && <p>Loading menu items...</p>}
               {error && <p style={{color: 'red'}}>Error: {error}</p>}
                <div className="order-grid">
                    {itemsToRender.map((item) => (
                      <FoodCardOrder
                        key={item.id}
                        {...item}
                        onAddToCart={handleAddToCart}
                     />
                  ))}
                 </div>
            </div>
         
              <div className="order-order-view">
                    <h2>Order Cart</h2>
                    {cart.map((item, index) => {
                        const imagePath = `/${item.title
                                .toLowerCase()
                                .replace(/\s+/g, "_")}.svg`;
                        return (
                            <div key={index} className={"order-order-item"}>
                                <div className={"order-order-item-info"}>
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
               <div className="order-order-total">
                      Total Amount: {calculateTotal().toLocaleString()} VND
                  </div>
                   <button className="order-order-button">Order</button>
              </div>
        </div>
      </div>
    </main>
  </div>
);
}