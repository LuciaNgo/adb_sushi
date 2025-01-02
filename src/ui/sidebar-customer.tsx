// ui/sidebar-customer.tsx
import { Nav, SideNav } from "react-sidenav";
import "@/styles/sidebar-customer.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const theme = {
    selectionColor: "#4F46E5",
    hoverBgColor: "#374151",
    color: "#FFFFFF",
    backgroundColor: "#1F2937",
};

interface SidebarProps {
    links: { id: string; label: string; path: string }[];
    userInfo: {
        MAKHACHHANG: string;
        HOTEN: string;
    } | null;
    employeeInfo: {
        MANHANVIEN: string;
        HOTEN: string;
    } | null;
}

export function SidebarCustomer({ links, userInfo, employeeInfo }: SidebarProps) {
  const router = useRouter();
    const handleSignOut = () => {
        localStorage.removeItem('userInfo');
         localStorage.removeItem('isEmployee');
         localStorage.removeItem('employeeInfo');
        router.push("/signin");
    }
    return (
      <div className="h-24">
            <SideNav defaultSelectedPath={links[0]?.id || "home"} theme={theme}>
              <div id="sidebar-customer" className="sidebar-customer">
                  <div className="flex">
                     {links.map((link) => (
                           <Nav id={link.id} key={link.id}>
                            <Link href={link.path}>{link.label}</Link>
                          </Nav>
                     ))}
                 </div>
                 <div className={"sidebar-customer-info-and-logout"}>
                    {userInfo && (
                        <div id="sidebar-customer-info">
                            <p style={{ margin: 0 }}>{userInfo.HOTEN}</p>
                            <p style={{ margin: 0, fontSize: "0.8rem" }}>{userInfo.MAKHACHHANG}</p>
                        </div>
                     )}
                    {employeeInfo && (
                           <div id="sidebar-customer-info">
                             <p style={{ margin: 0 }}>{employeeInfo.HOTEN}</p>
                               <p style={{ margin: 0, fontSize: "0.8rem" }}>{employeeInfo.MANHANVIEN}</p>
                            </div>
                        )}
                 </div>
            </div>
           </SideNav>
      </div>
   );
}