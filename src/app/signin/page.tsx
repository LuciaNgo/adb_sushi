"use client";
import Image from "next/image";
import "@/styles/signin.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
    MAKHACHHANG: string;
    HOTEN: string;
    SDTKHACHHANG: string;
    MATAIKHOAN: string;
}
interface EmployeeInfo {
    MANHANVIEN: string;
    HOTEN: string;
    MABOPHAN: string;
    Role: string;
}

type UserOrEmployee = UserInfo | EmployeeInfo;


export default function SignInPage() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch('/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ signInPhone: phone, signInPass: password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Sign in failed");
            } else {
                const userData = await response.json() as UserOrEmployee;
                  
                 if ("Role" in userData) {
                    //Employee Login
                    localStorage.setItem('isEmployee', "true");
                    if(userData.Role === 'manager'){
                        router.push("/admin/manager")
                    }else {
                        router.push("/admin/employee");
                    }
                 } else {
                    //Customer Login
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                      router.push("/");
                }

            }

        } catch (err) {
            console.error("Error signing in", err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }

    };

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
                <form className="signIn-form" onSubmit={handleSubmit}>
                    <div className="signIn-form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            id="phone"
                            className="signIn-form-group-input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="signIn-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="signIn-form-group-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button id="signIn" className="signIn-form-btn" type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    <button id="signIn-goBack" className="signIn-form-btn" type="reset" onClick={() => router.push("/")}>Go back to home screen</button>
                </form>
            </div>
        </div>
    );
}