"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { SidebarCustomer} from "@/ui/sidebar-customer";
import { FoodCardDelivery } from "@/ui/food-card-delivery";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/home.css";
import "@/styles/delivery.css";

interface UserInfo {
    MAKHACHHANG: string;
    HOTEN: string;
    SDTKHACHHANG: string;
    MATAIKHOAN: string;
}

interface EmployeeInfo {
    MANHANVIEN: string;
    HOTEN: string;
    MABOPHAN: string;
    Role: string;
}

type UserOrEmployee = UserInfo | EmployeeInfo;

const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/menu" },
    { id: "booking", label: "Booking", path: "/booking" },
    { id: "delivery", label: "Delivery", path: "/delivery" },
];

const deliveryLinks = [
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

interface DeliveryItem {
    id: string;
    title: string;
    price: number;
    category: string;
}

interface CartItem extends DeliveryItem {
    quantity: number
}

type CategoryKeys =  "appetize" | "sushi" | "nigiri" | "sashimi" | "gunkan" | "yakimono" | "nabemono" | "lunch box" | "desserts" | "drink" ;

export default function DeliveryPage() {
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showOrderView, setShowOrderView] = useState(true);
    const [activeCategory, setActiveCategory] = useState<CategoryKeys>("appetize");
    const [menuItems, setMenuItems] = useState<DeliveryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
     const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchMenuItems = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/delivery?category=${activeCategory}`);
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

     useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
          setIsLoggedIn(true);
           setUserInfo(JSON.parse(storedUser));
        } else {
          setIsLoggedIn(false);
            setUserInfo(null);
         }
      }, []);

    const filteredMenuItems = menuItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const itemsToRender = searchTerm ? filteredMenuItems : menuItems;

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
        <div id="header" className="header">
            <Image
                className="header-logo"
                src="/logoSuShiX.svg"
                alt="Next.js logo"
                width={180}
                height={40}
                priority
            />
                <Sidebar links={tabs} />
                {isLoggedIn ? (
                    <>
                    {userInfo && (
                        <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                            <p style={{margin: 0}}> {userInfo.HOTEN}</p>
                        </div>
                    )}
                   <button className="header-btn" onClick={() => {localStorage.removeItem('userInfo');localStorage.removeItem('isEmployee');localStorage.removeItem('employeeInfo'); router.push("/signin")}}>
                     Log Out
                   </button>
                </>
                ) : (
                  <button className="header-btn" onClick={() => router.push("/signin")}>
                    Sign In
                  </button>
                )}
        </div>

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
                {isLoading && <p>Loading menu items...</p>}
                 {error && <p style={{color: 'red'}}>Error: {error}</p>}
                <div className="delivery-grid">
                    {itemsToRender.map((item) => (
                      <FoodCardDelivery
                         key={item.id}
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