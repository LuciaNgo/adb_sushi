"use client";
import Image from "next/image";
import "@/styles/booking.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/ui/sidebar";

const tabs = [
  { id: "home", label: "Home", path: "/" },
  { id: "menu", label: "Menu", path: "/menu" },
  { id: "booking", label: "Booking", path: "/booking" },
  { id: "delivery", label: "Delivery", path: "/delivery" },
  { id: "about", label: "About", path: "/about" },
];


export function Form() {
  const [formData, setFormData] = useState({
    area: "",
    restaurant: "",
    reservDate: "",
    arrivalTime: "",
    phone: "",
    fullName: "",
    numberOfPatrons: "",
    specialRequest: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.preventDefault();
      return;
    }
  
    e.preventDefault();
    console.log("Form submitted:", formData);
  
    const bookingContent = document.getElementById("booking-content");
    if (bookingContent) {
      bookingContent.setAttribute("hidden", "");
      const bookingOrder = document.getElementById("booking-order");
      if (bookingOrder) {
        bookingOrder.removeAttribute("hidden");
      }
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="booking-form-row">
        <div className="booking-form-group">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            name="area"
            className="booking-form-group-input"
            value={formData.area}
            required
            onChange={handleChange}
          />
        </div>
        <div className="booking-form-group">
          <label htmlFor="restaurant">Restaurant Branches</label>
          <input
            type="text"
            id="restaurant"
            name="restaurant"
            className="booking-form-group-input"
            value={formData.restaurant}
            required
            onChange={handleChange}
          />
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
      </div>

      <div className="booking-form-row">
        <div className="booking-form-group">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            className="booking-form-group-input"
            value={formData.arrivalTime}
            required
            onChange={handleChange}
          />
        </div>
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
          />
        </div>
      </div>

      <div className="booking-form-row">
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
      <button className="booking-form-btn" type="submit">Booking</button>
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


export function Header() {
  const router = useRouter();
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
      <Sidebar links={tabs}/>
      <div>
        <button className="header-btn" onClick={() => router.push("/signin")}>
            Sign In
        </button>
      </div>
    </div>
);
}

export default function Home() {
  return (
    <div id="booking-page">
        <Header/>
        <AskOrder/>
        <div id="booking-content">
          <div className="booking-content-title">Online reservation information</div>
          <div>Please make a reservation at least 1 hour before your dining time.</div>
          <Form/>
        </div>
    </div>
  );
};
