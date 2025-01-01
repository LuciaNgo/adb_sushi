"use client";
import Image from 'next/image';
import { Sidebar } from '@/ui/sidebar';
import "@/styles/employee-statistics.css";
import { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Listbox } from '@headlessui/react';
import { useRouter } from "next/navigation";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/admin/employee" },
];

export function Header() {
  const router = useRouter();
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
        <button className="header-btn" onClick={() => router.push("/signin")}>
          Sign In
        </button>
      </div>
    </div>
  );
}

const employeeData = [
  { id: "NV000001", employeeName: "John Lee", diemphucvu: "10", role: "Cook", chinhanh: "CN00002" },
  { id: "NV000002", employeeName: "Richard Zhao", diemphucvu: "9", role: "Security", chinhanh: "CN00004" },
  { id: "NV000003", employeeName: "Lady Gaga", diemphucvu: "4.5", role: "Sale", chinhanh: "CN00003" },
  { id: "NV000004", employeeName: "Mickey Mouse", diemphucvu: "7.8", role: "Service", chinhanh: "CN00005" },
];

const revenueData = [
  { name: 'Jan', online: 40000, offline: 24000 },
  { name: 'Feb', online: 30000, offline: 13980 },
  { name: 'Mar', online: 20000, offline: 9800 },
  { name: 'Apr', online: 27800, offline: 39000 },
  { name: 'May', online: 18900, offline: 48000 },
  { name: 'Jun', online: 23900, offline: 38000 },
  { name: 'Jul', online: 34900, offline: 43000 },
];

const timeFilters = [
  { id: 1, name: "Day" },
  { id: 2, name: "Month" },
  { id: 3, name: "Quarter" },
  { id: 4, name: "Year" },
];

export default function Home() {
  const revenueRef = useRef<HTMLDivElement>(null);
  const scrollToRevenue = () => {
    if (revenueRef.current) {
      revenueRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [selected, setSelected] = useState(timeFilters[0]);
  const [selectedEmployee, setSelectedEmployee] = useState("AEON");

  return (
    <div>
      <Header />
      <main className="flex-1">
        <div className="home-contentGroup home-contentGroup1 relative">
          <Image
            src="/statistics_2.svg"
            alt="statistics"
            width={1150}
            height={700}
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <button className="home-btn-btn" onClick={scrollToRevenue}>Explore Data</button>
          </div>
        </div>

        <div ref={revenueRef}>

          <div className="employees-section">
            <h2 className="employees-title">Employees</h2>
            <div className="employees-table-wrapper">
              <div className="employees-table-action">
                <div className="employees-time-filter">
                  <button>Day</button>
                  <button>Month</button>
                  <button>Quarter</button>
                  <button>Year</button>
                </div>
                <input
                  placeholder="Find employee"
                  className="employees-search"
                />
                <select
                  className="employees-dropdown"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="AEON">Chi nhánh AEON</option>
                  <option value="SAIGON">Chi nhánh Sài Gòn</option>
                  <option value="VINCOM">Chi nhánh Vincom</option>
                </select>
              </div>
              <div className="employees-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Employee Name</th>
                      <th>Điểm phục vụ</th>
                      <th>Role</th>
                      <th>Chi nhánh</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.employeeName}</td>
                        <td>{employee.diemphucvu}</td>
                        <td>{employee.role}</td>
                        <td>{employee.chinhanh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}