 // app/api/booking/route.ts
 import { NextResponse } from 'next/server';

 interface BookingRequest {
      restaurant: string;
      reservDate: string;
      arrivalTime: string;
      phone: string;
      fullName: string;
      numberOfPatrons: string;
      specialRequest: string;
}

export async function POST(request: Request) {
    try {
         const { restaurant, reservDate, arrivalTime, phone, fullName, numberOfPatrons, specialRequest } = await request.json() as BookingRequest;

       const response = await fetch(`http://localhost:3001/booking`, {
             method: 'POST',
            headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                SDTKHACHHANG: phone,
                NHAHANG: restaurant,
                NGAYDEN: reservDate,
                GIODEN: arrivalTime,
                SOLUONGKHACH: numberOfPatrons,
                GHICHU: specialRequest,
            }),
            cache: 'no-store'
         });
        if (!response.ok) {
          const errorData = await response.json();
             return NextResponse.json({ error: errorData.error || "Booking failed" }, {status: response.status});
         }
    
       const result = await response.json();
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
   }
}