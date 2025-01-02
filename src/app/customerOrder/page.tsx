"use client";
import Image from 'next/image';
import { Sidebar } from '@/ui/sidebar';
import "@/styles/customerOrder.css";
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
    { MAPHIEUDAT: "PM000001", NGAYLAP: "2024-12-01", SOBAN: 2, MANHANVIEN: "NV000003", DIACHIGIAO: "123 Lê Lợi, Tân Phú", MACHINHANH: "CN000001" },
    { MAPHIEUDAT: "PM000002", NGAYLAP: "2024-12-02", SOBAN: 1, MANHANVIEN: "NV000003", DIACHIGIAO: "456 Nguyễn Văn Trỗi", MACHINHANH: "CN000001" },
    { MAPHIEUDAT: "PM000003", NGAYLAP: "2024-12-10", SOBAN: 1, MANHANVIEN: "NV000003", DIACHIGIAO: "790 Nguyễn Văn Linh", MACHINHANH: "CN000003" },
    { MAPHIEUDAT: "PM000004", NGAYLAP: "2022-05-01", SOBAN: 1, MANHANVIEN: "NV000003", DIACHIGIAO: "SFDSFSF", MACHINHANH: "CN000003" },
    { MAPHIEUDAT: "PM000005", NGAYLAP: "2022-10-15", SOBAN: 1, MANHANVIEN: "NV000003", DIACHIGIAO: "SFDFSGFDSSF", MACHINHANH: "CN000003" },
    { MAPHIEUDAT: "PM000006", NGAYLAP: "2024-12-01", SOBAN: 2, MANHANVIEN: "NV000003", DIACHIGIAO: "meo meo", MACHINHANH: "CN000001" },
    { MAPHIEUDAT: "PM000007", NGAYLAP: "2024-12-01", SOBAN: 1, MANHANVIEN: "NV000003", DIACHIGIAO: "mèo mèo", MACHINHANH: "CN000001" }
  ];


export default function Page() {
    const [selectedBranch, setSelectedBranch] = useState(branchFilters[0]);
    const [selectedDate, setSelectedDate] = useState('');
    const filteredData = tableData.filter(
        (item) => item.NGAYLAP === selectedDate && item.MACHINHANH === selectedBranch.id
      );
    return (
        <div>
            <Header />
            <h1 className="title">FOOD ORDER</h1>
            <div className="listbox-wrapper right-section">
            {/* Add Food Order Button */}
            <button className="listbox-button">Add food order</button>
    
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
                    <th>MAPHIEUDAT</th>
                    <th>NGAYLAP</th>
                    <th>SOBAN</th>
                    <th>MANHANVIEN</th>
                    <th>DIACHIGIAO</th>
                    <th>MACHINHANH</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.MAPHIEUDAT}</td>
                        <td>{row.NGAYLAP}</td>
                        <td>{row.SOBAN}</td>
                        <td>{row.MANHANVIEN}</td>
                        <td>{row.DIACHIGIAO}</td>
                        <td>{row.MACHINHANH}</td>
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