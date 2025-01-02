"use client";
import Image from 'next/image';
import { Sidebar } from '@/ui/sidebar';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

const tabs = [
{ id: "home", label: "Home", path: "/" },
{ id: "menu", label: "Menu", path: "/menu" },
{ id: "booking", label: "Booking", path: "/booking" },
{ id: "delivery", label: "Delivery", path: "/delivery" },
{ id: "about", label: "About", path: "/about" },
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
export function Header() {
const router = useRouter();
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isEmployee, setIsEmployee] = useState(false);
useEffect(() => {
 const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
       setIsLoggedIn(true);
       setIsEmployee(false);
    }
     const isEmployeeStored = localStorage.getItem('isEmployee');
     if(isEmployeeStored) {
         setIsLoggedIn(true);
         setIsEmployee(true)
     }
 }, []);

const handleSignOut = () => {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('isEmployee');
  setIsLoggedIn(false);
  setIsEmployee(false);
   router.push("/signin");
 }


return (
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
   <div>
      {isLoggedIn ? (
         <button className="header-btn" onClick={handleSignOut}>
          Log Out
        </button>
       ) : (
          <button className="header-btn" onClick={() => router.push("/signin")}>
           Sign In
        </button>
     )}
   </div>
 </div>
);
}