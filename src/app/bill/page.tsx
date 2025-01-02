"use client";
import Image from 'next/image';
import { Sidebar } from '@/ui/sidebar';
import "@/styles/bill.css";
import "@/styles/employee-statistics.css";
import { useState, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { useRouter } from "next/navigation";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "customerOrder", label: "Customer Order", path: "/customerOrder" },
  { id: "bill", label: "Bill", path: "/bill" },
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

const branchFilters = [
    { id: "CN000001", name: "CN000001 - Chi nhánh AEON MALL Tân Phú" },
    { id: "CN000002", name: "CN000002 - Chi Nhánh GigaMall Thủ Đức" },
    { id: "CN000003", name: "CN000003 - Chi nhánh Crescent Mall" },
    { id: "CN000004", name: "CN000004 - Chi nhánh Saigon Centre" },
    { id: "CN000005", name: "CN000005 - Chi nhánh Nowzone" },
    { id: "CN000006", name: "CN000006 - Chi nhánh Times City" },
    { id: "CN000007", name: "CN000007 - Chi nhánh Royal City" },
    { id: "CN000008", name: "CN000008 - Chi nhánh Vincom Bắc Từ Liêm" },
    { id: "CN000009", name: "CN000009 - Chi nhánh Vincom Plaza Skylake" },
    { id: "CN000010", name: "CN000010 - Chi nhánh Savico Megamall" },
    { id: "CN000011", name: "CN000011 - Chi nhánh Indochina Riverside Towers" },
    { id: "CN000012", name: "CN000012 - Chi nhánh GO! Đà Nẵng" },
    { id: "CN000013", name: "CN000013 - Chi nhánh Sense City Cần Thơ" },
    { id: "CN000014", name: "CN000014 - Chi nhánh Vincom Plaza Cần Thơ" },
    { id: "CN000015", name: "CN000015 - Chi nhánh Vincom Plaza Huế" },
];
    
const tableData = [
  { MAHOADON: "HD000004", NGAYLAP: "2022-05-01 14:00:00", TONGTIENTRUOCGIAMGIA: 1000000000, SOTIENDUOCGIAM: 0, TONGTIENSAUGIAMGIA: 1000000000, THE: "NULL", PHIEUDATMUA: "PM000004" },
  { MAHOADON: "HD000005", NGAYLAP: "2022-10-15 01:00:00", TONGTIENTRUOCGIAMGIA: 1000000000, SOTIENDUOCGIAM: 0, TONGTIENSAUGIAMGIA: 1000000000, THE: "NULL", PHIEUDATMUA: "PM000005" },
  { MAHOADON: "HD000001", NGAYLAP: "2024-12-10 00:00:00", TONGTIENTRUOCGIAMGIA: 500000, SOTIENDUOCGIAM: 50000, TONGTIENSAUGIAMGIA: 450000, THE: "TH000001", PHIEUDATMUA: "PM000001" },
  { MAHOADON: "HD000002", NGAYLAP: "2024-12-11 00:00:00", TONGTIENTRUOCGIAMGIA: 300000, SOTIENDUOCGIAM: 15000, TONGTIENSAUGIAMGIA: 285000, THE: "TH000002", PHIEUDATMUA: "PM000002" },
  { MAHOADON: "HD000003", NGAYLAP: "2025-01-01 15:00:00", TONGTIENTRUOCGIAMGIA: 1000000000, SOTIENDUOCGIAM: 0, TONGTIENSAUGIAMGIA: 1000000000, THE: "NULL", PHIEUDATMUA: "PM000003" },
];


export default function Page() {
    const [selectedBranch, setSelectedBranch] = useState(branchFilters[0]);
    const [selectedDate, setSelectedDate] = useState('');
    const [inputId, setInputId] = useState("");
    const filteredData = tableData.filter(
        (item) => item.NGAYLAP === selectedDate 
      );
    return (
        <div>
            <Header />
            <h1 className="title">BILL</h1>
            <div className="listbox-wrapper right-section">
    
            {/* Dropdown Listbox */}
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
                        value={branch}
                    >
                        {branch.name}
                    </Listbox.Option>
                    ))}
                </Listbox.Options>
                </div>
            </Listbox>
            </div>
            {/* Date Picker */}
            <div className="date-picker-container">
                <label htmlFor="date-picker">Choose Date: </label>
                <input
                id="date-picker"
                type="date"
                className="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>MAHOADON</th>
                    <th>NGAYLAP</th>
                    <th>TONGTIENTRUOCGIAMGIA</th>
                    <th>SOTIENDUOCGIAM</th>
                    <th>TONGTIENSAUGIAMGIA</th>
                    <th>THE</th>
                    <th>PHIEUDATMON</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.MAHOADON}</td>
                        <td>{row.NGAYLAP}</td>
                        <td>{row.TONGTIENTRUOCGIAMGIA}</td>
                        <td>{row.SOTIENDUOCGIAM}</td>
                        <td>{row.SOTIENSAUGIAMGIA}</td>
                        <td>{row.THE}</td>
                        <td>{row.PHIEUDATMON}</td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td style={{ textAlign: "center" }}>
                        No data available for the selected date and branch.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}