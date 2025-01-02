"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from '@/ui/sidebar';
import { FoodCardDelivery } from "@/ui/food-card-delivery";
import { usePathname, useRouter } from "next/navigation";
import "@/styles/home.css";
import "@/styles/delivery.css";
import "@/styles/booking.css";

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

export function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress: "",
    deliveryPhone: "",
    paymentMethod: "",
    deliverySpecialRequest: ""
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn reload trang

    const form = e.currentTarget;

    // Kiểm tra tính hợp lệ của form
    if (!form.checkValidity()) {
      form.reportValidity(); // Hiển thị các lỗi built-in của trình duyệt
      return;
    }

    console.log("Form submitted:", formData);

    // Chuyển hướng đến trang "/"
    alert("Your delivery order has been record!");
    router.push("/order");
  };

  return (
    <form className="booking-form delivery-form" onSubmit={handleSubmit}>
      <div className="booking-form-row">
        <div className="booking-form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="booking-form-group-input"
            value={formData.fullName}
            required
            onChange={handleChange}
          />
        </div>
        <div className="booking-form-group">
          <label htmlFor="deliveryDate">Delivery Date</label>
          <input
            type="date"
            id="deliveryDate"
            name="deliveryDate"
            className="booking-form-group-input"
            value={formData.deliveryDate}
            required
            onChange={handleChange}
          />
        </div>
        <div className="booking-form-group">
          <label htmlFor="deliveryTime">Delivery Time</label>
          <input
            type="time"
            id="deliveryTime"
            name="deliveryTime"
            className="booking-form-group-input"
            value={formData.deliveryTime}
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="booking-form-row">
      <div className="booking-form-group">
          <label htmlFor="deliveryPhone">Phone Number</label>
          <input
            type="text"
            id="deliveryPhone"
            name="deliveryPhone"
            className="booking-form-group-input"
            value={formData.deliveryPhone}
            required
            onChange={handleChange}
          />
        </div>
        <div className="booking-form-group">
          <label htmlFor="deliveryAddress">Address</label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            className="booking-form-group-input"
            value={formData.deliveryAddress}
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="booking-form-row">
        <div className="booking-form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            className="booking-form-group-input"
            value={formData.paymentMethod}
            required
            onChange={handleChange}
          />
        </div>
        <div id="booking-request" className="booking-form-group">
          <label htmlFor="deliverySpecialRequest">Special requests</label>
          <textarea
            id="specialRequest"
            name="deliverySpecialRequest"
            className="booking-form-group-input delivery-request"
            value={formData.deliverySpecialRequest}
            onChange={handleChangeTextarea}
          ></textarea>
        </div>
      </div>
      <button className="booking-form-btn" type="submit">Order</button>
    </form>
  );
}

export function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
          setIsLoggedIn(true);
           setUserInfo(JSON.parse(storedUser));
      }
  }, []);

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
                <Sidebar links={tabs} />
                {isLoggedIn ? (
                    <>
                    {userInfo && (
                        <div style={{display: "flex", flexDirection: "column", alignItems: "end"}}>
                            <p style={{margin: 0}}> {userInfo.HOTEN}</p>
                        </div>
                    )}
                   <button className="header-logout" onClick={() => {localStorage.removeItem('userInfo');localStorage.removeItem('isEmployee');localStorage.removeItem('employeeInfo'); router.push("/signin")}}>
                     Log Out
                   </button>
                </>
                ) : (
                  <button className="header-btn" onClick={() => router.push("/signin")}>
                    Sign In
                  </button>
                )}
    </div>
);
}

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

    const handleGoToInfo = () => {   
      if (calculateTotal() <= 0) {
        alert("No dish in the order!");
      }
      else {
        const deliveryMenu = document.getElementById("deliveryMenu");
        if (deliveryMenu) {
          deliveryMenu.setAttribute("hidden", "");
          const deliveryInfo = document.getElementById("deliveryInfo");
          if (deliveryInfo) {
            deliveryInfo.removeAttribute("hidden");
          }
        }
      }
    };

  return (
    <div>
        <Header/>
        <div id="deliveryInfo" hidden>
          <div className="booking-content-title">Delivery Information</div>
          <Form/>
        </div>

      <main id="deliveryMenu" className="flex-1">
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
                  <button className="delivery-order-button" onClick={() => handleGoToInfo()}>Order</button>
              </div>
        </div>
      </div>
    </main>
    </div>
  );
}