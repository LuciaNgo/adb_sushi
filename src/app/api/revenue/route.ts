import { NextResponse } from 'next/server';

interface RevenueItem {
    MAHOADON: string;
    SDT_KH: string;
    NGAYLAP: string;
    TONGTIENSAUGIAMGIA: number;
    MACHINHANH: string;
}
interface RevenueData {
   revenueItems: RevenueItem[],
   total: number,
   customer: number,
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const time = searchParams.get('time');
    const branch = searchParams.get('branch');

    try {
        const response = await fetch(`http://localhost:3001/revenue`, {
             method: 'GET',
            headers: {
             'Content-Type': 'application/json',
           },
            cache: 'no-store',
             body: JSON.stringify({ time, branch }),
          });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const revenueData = await response.json();

      const formattedRevenue = revenueData.revenueItems.map((item: any) => ({
          id: item.MAHOADON,
          phone: item.SDT_KH,
          date: item.NGAYLAP,
          total: item.TONGTIENSAUGIAMGIA,
          branch: item.MACHINHANH,
       }));
    
         return NextResponse.json({
          revenueItems: formattedRevenue,
           total: revenueData.total,
           customer: revenueData.customer,
        });
   } catch (error) {
         console.error("Failed to fetch menu:", error)
        return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 });
    }
}