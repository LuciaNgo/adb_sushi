"use client";
import Image from "next/image";
import { Sidebar } from "@/ui/sidebar";
 import { SidebarCustomer} from "@/ui/sidebar-customer";
import "@/styles/home.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

interface UserInfo {
    MAKHACHHANG: string;
    HOTEN: string;
    SDTKHACHHANG: string;
    MATAIKHOAN: string;
}

const tabs = [
    { id: "home", label: "Home", path: "/" },
    { id: "menu", label: "Menu", path: "/menu" },
    { id: "booking", label: "Booking", path: "/booking" },
    { id: "delivery", label: "Delivery", path: "/delivery" },
];

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

export default function Home() {
 return (
    <div>
       <Header/>
        
        <main className="flex-1">
          <div className="home-contentGroup home-contentGroup1">
            <Image
              className=""
               src="/home_1.svg"
               alt="home_1"
              width={1150}
                height={700}
                priority
            />
             <p className="home-contentTitle home-contentGroup__text1">Welcome to Our Restaurant</p>
            <svg width="504" height="4" viewBox="0 0 504 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 2H502" stroke="#EA6D27" strokeWidth="3" strokeLinecap="round"/>
             </svg>
            <p className="home-contentDescription0">SushiX Japanese Restaurant is the inheritance and perfection of the SushiY brand,  with a close and friendly Japanese restaurant model and nearly 100 Japanese dishes and desserts to serve Vietnamese friends who visit to enjoy every day.
            </p>
         </div>

         <div  className="home-contentGroup home-contentGroupGray home-contentGroup2">
             <Image
                className=""
                 src="/home_2.svg"
                alt="home_2"
                 width={880}
                height={600}
               priority
             />
            </div>
          <div id="home-contentGroupContent_1" className="home-contentGroupContent">
              <p className="home-contentTitle home-contentGroup__text1">Menu</p>
            <svg width="200" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M2 2H502" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
            </svg>
              <p className="home-contentDescription0 home-contentDescription1">
              SushiX menu is diverse with fresh colors from Lobster Sashimi, Japanese Scallops, Miyagi Oysters, etc. The key to culinary success comes from the freshest ingredients made from the talented hands of the chef.              </p>
            </div>

             <div  className="home-contentGroup">
            <Image
                  className=""
                src="/home_3.svg"
                 alt="home_3"
                width={880}
                height={600}
                priority
            />
           </div>
          <div id="home-contentGroupContent_2" className="home-contentGroupContent home-contentGroupContent1">
                <p className="home-contentTitle home-contentGroup__text1">Reservation</p>
               <svg width="250" height="4" viewBox="0 0 300 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 2H502" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                 <p className="home-contentDescription0 home-contentDescription1">
              SushiX menu is diverse with fresh colors from Lobster Sashimi, Japanese Scallops, Miyagi Oysters, etc. The key to culinary success comes from the freshest ingredients made from the talented hands of the chef.
                </p>
           </div>

            <div  className="home-contentGroup home-contentGroupGray home-contentGroup2">
             <Image
                className=""
                 src="/home_4.svg"
                 alt="home_4"
                 width={880}
               height={600}
                priority
            />
            </div>
           <div id="home-contentGroupContent_3" className="home-contentGroupContent">
                <p className="home-contentTitle home-contentGroup__text1">Delivery</p>
              <svg width="200" height="4" viewBox="0 0 200 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M2 2H502" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="home-contentDescription0 home-contentDescription1">
               SushiX menu is diverse with fresh colors from Lobster Sashimi, Japanese Scallops, Miyagi Oysters, etc. The key to culinary success comes from the freshest ingredients made from the talented hands of the chef.              </p>
          </div>
        </main>
   </div>
 );
}