 // app/api/signin/route.ts
 import { NextResponse } from 'next/server';

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


 export async function POST(request: Request) {
     try {
         const { signInPhone, signInPass } = await request.json();
          
         const response = await fetch(`http://localhost:3001/signin`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ sdt: signInPhone, matkhau: signInPass }),
             cache: 'no-store'
         });
         if (!response.ok) {
             const errorData = await response.json();
             return NextResponse.json({ error: errorData.error || "Sign in failed" }, {status: response.status});
           }

         const userData = await response.json() as UserOrEmployee[];
             return NextResponse.json(userData[0], { status: 200 });
     } catch (error) {
       console.error('Error during sign in:', error);
         return NextResponse.json({ error: "An error occured during sign in" }, { status: 500 });
     }
 }