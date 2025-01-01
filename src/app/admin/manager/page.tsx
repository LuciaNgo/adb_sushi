"use client";
import Image from 'next/image';
import { Sidebar } from '@/ui/sidebar';
import "@/styles/employee-statistics.css";
import { useState, useRef } from 'react';
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

const timeFilters = [
  { id: 1, name: "Day" },
  { id: 2, name: "Month" },
  { id: 3, name: "Quarter" },
  { id: 4, name: "Year" },
];

const branchFilters = [
  { id: 1, name: "CN000001 - Chi nhánh AEON MALL Tân Phú" },
  { id: 2, name: "CN000002 - Chi Nhánh GigaMall Thủ Đức" },
  { id: 3, name: "CN000003 - Chi nhánh Crescent Mall" },
  { id: 4, name: "CN000004 - Chi nhánh Saigon Centre" },
  { id: 5, name: "CN000005 - Chi nhánh Nowzone" },
  { id: 6, name: "CN000006 - Chi nhánh Times City" },
  { id: 7, name: "CN000007 - Chi nhánh Royal City" },
  { id: 8, name: "CN000008 - Chi nhánh Vincom Bắc Từ Liêm" },
  { id: 9, name: "CN000009 - Chi nhánh Vincom Plaza Skylake" },
  { id: 10, name: "CN000010 - Chi nhánh Savico Megamall" },
  { id: 11, name: "CN000011 - Chi nhánh Indochina Riverside Towers" },
  { id: 12, name: "CN000012 - Chi nhánh GO! Đà Nẵng" },
  { id: 13, name: "CN000013 - Chi nhánh Sense City Cần Thơ" },
  { id: 14, name: "CN000014 - Chi nhánh Vincom Plaza Cần Thơ" },
  { id: 15, name: "CN000015 - Chi nhánh Vincom Plaza Huế" },
];

export default function Home() {
  const revenueRef = useRef<HTMLDivElement>(null);
  const scrollToRevenue = () => {
    if (revenueRef.current) {
      revenueRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // State riêng cho từng Listbox
  const [revenueFilter, setRevenueFilter] = useState(timeFilters[0]); 
  const [employeeFilter, setEmployeeFilter] = useState(timeFilters[0]);

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

        <div ref={revenueRef} className="revenue-section-wrapper">
          <div className="revenue-section">
            <h2 className="revenue-title">Revenue</h2>

            {/* Listbox cho Revenue */}
            <Listbox value={revenueFilter} onChange={setRevenueFilter}>
              <div className="listbox-container">
                <Listbox.Button className="listbox-button">
                  {revenueFilter.name}
                </Listbox.Button>
                <Listbox.Options className="listbox-options">
                  {timeFilters.map((time) => (
                  <Listbox.Option
                    key={time.id}
                    className="listbox-option"
                    value={time}>
                    {time.name}
                  </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            <div className={"revenue-data"}>
                <div className={"data-cards"}>
                  <div className={"data-card"}>
                    <p>Orders</p>
                    <p>$72,000</p>
                    <p>↑ 23%</p>
                    <div className={"bar-chart-small"}></div>
                  </div>
                  <div className={"data-card"}>
                    <p>Delivery</p>
                    <p>500</p>
                    <p>↓ 6%</p>
                    <div className={"bar-chart-small"}  style={{backgroundColor: '#34d399'}}></div>
                  </div>
                  <div className={"data-card"}>
                    <p>Total</p>
                    <p>100</p>
                    <p>↓ 9%</p>
                    <div className={"bar-chart-small"}  style={{backgroundColor: '#f59e0b'}}></div>
                  </div>
                </div>
            </div>
          </div>

          <div className="employees-section">
            <h2 className="employees-title">Employees</h2>
            <div className="employees-table-wrapper">
              <div className="employees-table-action">
                {/* Listbox cho Employees */}
                <Listbox value={employeeFilter} onChange={setEmployeeFilter}>
                  <div className="listbox-container">
                    <Listbox.Button className="listbox-button">
                      {employeeFilter.name}
                    </Listbox.Button>
                    <Listbox.Options className="listbox-options">
                      {timeFilters.map((time) => (
                        <Listbox.Option
                          key={time.id}
                          className="listbox-option"
                          value={time}>
                          {time.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>

                <input
                  placeholder="Find employee"
                  className="employees-search"
                />
                <select className="employees-dropdown" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
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
