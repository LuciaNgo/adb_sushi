import { Nav, SideNav } from "react-sidenav";
import "@/styles/sidebar.css";
import Link from "next/link";

export const theme = {
    selectionColor: "#4F46E5", // Màu khi được chọn
    hoverBgColor: "#374151",   // Màu khi hover
    color: "#FFFFFF",          // Màu văn bản
    backgroundColor: "#1F2937", // Màu nền sidebar
  };

interface SidebarProps {
    links: { id: string; label: string; path: string }[]; // Define the structure for links
}

export function Sidebar({ links }: SidebarProps) {
    return (
        <div className="h-24">
            <SideNav defaultSelectedPath={links[0]?.id || "home"} theme={theme}>
                <div id = "sidebar" className="flex">
                    {links.map((link) => (
                        <Nav id={link.id} key={link.id}>
                            <Link href={link.path}>{link.label}</Link>
                        </Nav>
                    ))}
                </div>
            </SideNav>
        </div>
    );
}