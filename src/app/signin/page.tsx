"use client";
import Image from "next/image";
import "@/styles/signin.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function Form() {
  const [formData, setFormData] = useState({
    signInPhone: "",
    signInPass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trình duyệt reload lại trang
    console.log("Form submitted:", formData);
  };

  const router = useRouter();

  return (
    <form className="signIn-form" onSubmit={handleSubmit}>
      <div className="signIn-form-group">
        <label htmlFor="signInPhone">Phone Number</label>
        <input
          type="text"
          id="signInPhone"
          name="signInPhone"
          className="signIn-form-group-input"
          value={formData.signInPhone}
          required
          onChange={handleChange}
        />
      </div>
      <div className="signIn-form-group">
        <label htmlFor="signInPass">Password</label>
        <input
          type="password"
          id="signInPass"
          name="signInPass"
          className="signIn-form-group-input"
          value={formData.signInPass}
          required
          onChange={handleChange}
        />
      </div>
      <button id="signIn" className="signIn-form-btn" type="submit">Sign In</button>
      <button id="signIn-goBack" className="signIn-form-btn" type="reset" onClick={() => router.push("/")}>Go back to home screen</button>
    </form>
  );
}

export default function Home() {
  return (
    <div id="signIn-page">
        <Image
            className="signIn-background"
            src="/signin.svg"
            alt="background"
            width={1000}
            height={700}
            priority
        />
        <div className="signIn-content">
            <div id="logo">
                <Image
                    src="/logoSuShiX.svg"
                    alt="Next.js logo"
                    width={198}
                    height={55}
                    priority
                />
            </div>
            <div className="signIn-signIn">Sign In</div>
            <Form/>
        </div>
    </div>
  );
};
