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

const revenueData = [
    { id: "HĐ000001", phone: "0937432754", date: "11-12-2004", total: 325000, branch: "CN00002" },
    { id: "HĐ000002", phone: "0822394853", date: "11-12-2004", total: 1500000, branch: "CN00002" },
    { id: "HĐ000003", phone: "0782938274", date: "23-12-2024", total: 560000, branch: "CN00002" },
    { id: "HĐ000004", phone: "0897482848", date: "27-12-2024", total: 800000, branch: "CN00002" },
    { id: "HĐ000005", phone: "0935363664", date: "27-12-2004", total: 350000, branch: "CN00002" },
    { id: "HĐ000006", phone: "0822374775", date: "28-12-2004", total: 1560000, branch: "CN00002" },
    { id: "HĐ000007", phone: "0786070053", date: "29-12-2024", total: 700000, branch: "CN00002" },
    { id: "HĐ000008", phone: "0895667477", date: "30-12-2024", total: 850000, branch: "CN00002" },
  ];

const employeeData = [
  { id: "NV000001", employeeName: "John Lee", point: "10", role: "Cook", branch: "CN00002" },
  { id: "NV000002", employeeName: "Richard Zhao", point: "9", role: "Security", branch: "CN00004" },
  { id: "NV000003", employeeName: "Lady Gaga", point: "4.5", role: "Sale", branch: "CN00003" },
  { id: "NV000004", employeeName: "Mickey Mouse", point: "7.8", role: "Service", branch: "CN00005" },
  { id: "NV000005", employeeName: "John Lee", point: "10", role: "Cook", branch: "CN00002" },
  { id: "NV000006", employeeName: "Richard Zhao", point: "9", role: "Security", branch: "CN00004" },
  { id: "NV000007", employeeName: "Lady Gaga", point: "4.5", role: "Sale", branch: "CN00003" },
  { id: "NV000008", employeeName: "Mickey Mouse", point: "7.8", role: "Service", branch: "CN00005" },
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

function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price);
  }

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
  const [selectedBranch, setSelectedBranch] = useState(branchFilters[0]);

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

             <div className="revenue-table-wrapper">
             <div className="revenue-table">
                <table>
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Customer Phone</th>
                      <th>Payment Date</th>
                      <th>Total Cost</th>
                      <th>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueData.map((invoice) => (
                      <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.phone}</td>
                        <td>{invoice.date}</td>
                        <td>{invoice.total}</td>
                        <td>{invoice.branch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  placeholder="Search ID"
                  className="employees-search-id"
                  
                />
                <input
                  placeholder="Search employee name"
                  className="employees-search-name"
                />
                
                {/* Listbox cho Chi nhánh */}
                <Listbox value={selectedBranch} onChange={setSelectedBranch}>
                  <div className="listbox-container">
                    <Listbox.Button className="listbox-button">
                      {selectedBranch.name}
                    </Listbox.Button>
                    <Listbox.Options className="listbox-options">
                      {branchFilters.map((branch) => (
                        <Listbox.Option
                          key={branch.id}
                          className="listbox-option"
                          value={branch}>
                          {branch.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div className="employees-table">
                <table>
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Service Point</th>
                      <th>Role</th>
                      <th>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.employeeName}</td>
                        <td>{employee.point}</td>
                        <td>{employee.role}</td>
                        <td>{employee.branch}</td>
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