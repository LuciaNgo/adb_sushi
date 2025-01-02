"use client";
import Image from "next/image";
import "@/styles/booking.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/ui/sidebar";
import { SidebarCustomer} from "@/ui/sidebar-customer";

const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/menu" },
    { id: "booking", label: "Booking", path: "/booking" },
    { id: "delivery", label: "Delivery", path: "/delivery" },
];

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

interface Branch {
    id: string;
    label: string;
}

const branches: Branch[] = [
    { id: "CN000001", label: "Chi nhánh AEON MALL Tân Phú" },
    { id: "CN000002", label: "Chi Nhánh GigaMall Thủ Đức" },
    { id: "CN000003", label: "Chi nhánh Crescent Mall" },
    { id: "CN000004", label: "Chi nhánh Saigon Centre" },
    { id: "CN000005", label: "Chi nhánh Nowzone" },
    { id: "CN000006", label: "Chi nhánh Times City" },
    { id: "CN000007", label: "Chi nhánh Royal City" },
    { id: "CN000008", label: "Chi nhánh Vincom Bắc Từ Liêm" },
    { id: "CN000009", label: "Chi nhánh Vincom Plaza Skylake" },
    { id: "CN000010", label: "Chi nhánh Savico Megamall" },
    { id: "CN000011", label: "Chi nhánh Indochina Riverside Towers" },
    { id: "CN000012", label: "Chi nhánh GO! Đà Nẵng" },
    { id: "CN000013", label: "Chi nhánh Sense City Cần Thơ" },
    { id: "CN000014", label: "Chi nhánh Vincom Plaza Cần Thơ" },
    { id: "CN000015", label: "Chi nhánh Vincom Plaza Huế" },
];

export function Form() {
    const [formData, setFormData] = useState({
        restaurant: "",
        reservDate: "",
        arrivalTime: "",
        phone: "",
        fullName: "",
        numberOfPatrons: "",
        specialRequest: ""
    });
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
   const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
   const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
            setIsCustomerLoggedIn(true);
        }else{
          setIsCustomerLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        if (userInfo) {
            setFormData(prev => ({
                ...prev,
                phone: userInfo?.SDTKHACHHANG || '',
                fullName: userInfo?.HOTEN || ''
            }))
        }
    }, [userInfo]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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

     const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;
      if (!form.checkValidity()) {
          e.preventDefault();
           return;
        }
      e.preventDefault();
      setError(null);
      setIsLoading(true);
   
       try{
           const response = await fetch("/api/booking", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                 },
                  body: JSON.stringify(formData),
             });
             if (!response.ok) {
                 const errorData = await response.json();
                  setError(errorData.error || "Booking failed");
                return;
            }
             router.push("/order")
  
  
      } catch (error) {
           console.error("Error signing in:", error);
            setError("An unexpected error occurred.");
        } finally {
             setIsLoading(false)
       }
 };


    return (
        <form className="booking-form" onSubmit={handleSubmit}>
             <div className="booking-form-row">
             <div className="booking-form-group">
                    <label htmlFor="restaurant">Restaurant Branches</label>
                    <select
                        id="restaurant"
                        name="restaurant"
                        className="booking-form-group-input"
                        value={formData.restaurant}
                        required
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a branch</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.label}
                            </option>
                        ))}
                     </select>
                </div>
                <div className="booking-form-group">
                    <label htmlFor="reservDate">Reservation Date</label>
                    <input
                        type="date"
                        id="reservDate"
                        name="reservDate"
                        className="booking-form-group-input"
                        value={formData.reservDate}
                        required
                        onChange={handleChange}
                    />
                </div>
                  <div className="booking-form-group">
                    <label htmlFor="arrivalTime">Arrival Time</label>
                    <input
                        type="time"
                        id="arrivalTime"
                        name="arrivalTime"
                        className="booking-form-group-input"
                        value={formData.arrivalTime}
                        required
                       onChange={(e) => {
                           const timeValue = e.target.value;
                           // Lưu giá trị với định dạng HH:mm:00
                            setFormData({ ...formData, arrivalTime: `${timeValue}:00` });
                      }}
                    />
                </div>
            </div>

            <div className="booking-form-row">
                <div className="booking-form-group">
                    <label htmlFor="phone">Phone Number</label>
                   <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="booking-form-group-input"
                        value={formData.phone}
                        required
                        onChange={handleChange}
                       disabled={isCustomerLoggedIn}
                    />
                </div>
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
                        disabled={isCustomerLoggedIn}
                     />
                </div>
                <div className="booking-form-group">
                    <label htmlFor="numberOfPatrons">Number Of Patrons</label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        id="numberOfPatrons"
                        name="numberOfPatrons"
                        className="booking-form-group-input"
                        value={formData.numberOfPatrons}
                        required
                        onChange={handleChange}
                    />
                </div>
            </div>
              <div className="booking-form-row">
                <div id="booking-request" className="booking-form-group">
                   <label htmlFor="specialRequest">Special requests</label>
                      <textarea
                        id="specialRequest"
                         name="specialRequest"
                        className="booking-form-group-input"
                        value={formData.specialRequest}
                         onChange={handleChangeTextarea}
                       ></textarea>
                </div>
              </div>
           {error && <p style={{color: 'red'}}>{error}</p>}
           <button className="booking-form-btn" type="submit" disabled={isLoading}>
                 {isLoading ? "Booking..." : "Booking"}
              </button>
        </form>
     );
   }
   
   export function AskOrder() {
       const router = useRouter();
        return (
           <div id="booking-order" hidden>
               <div className="booking-order-title">
                 Booking successfully
               </div>
                <div className="booking-order-title">
                    Would you like to order ahead?
               </div>
               <div className="booking-order-group">
                  <button className="booking-order-btn" onClick={() => router.push("/order")}>
                       Yes
                    </button>
                   <button id="booking-order-no" className="booking-order-btn" onClick={() => router.push("/")}>
                      No
                    </button>
                </div>
           </div>
         );
  }
   

export default function Home() {
    const router = useRouter();
     const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
        const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);


     useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
           if (storedUser) {
              setIsLoggedIn(true);
                setUserInfo(JSON.parse(storedUser));
            }
             const isEmployeeStored = localStorage.getItem('isEmployee');
             if(isEmployeeStored) {
                 setIsLoggedIn(true);
                const employeeStored = localStorage.getItem('employeeInfo');
                 if(employeeStored){
                      setEmployeeInfo(JSON.parse(employeeStored));
                   }
             }
       }, []);
    return (
        <div id="booking-page">
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
             <AskOrder/>
           <div id="booking-content">
                <div className="booking-content-title">Online reservation information</div>
                  <div>Please make a reservation at least 1 hour before your dining time.</div>
                 <Form/>
            </div>
       </div>
     );
   };