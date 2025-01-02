// app/api/delivery/route.ts

import { NextResponse } from 'next/server';

interface MenuItemFromBackend {
    MAMONAN: string;
    TENMONAN: string;
    GIA: number;
    MUCTHUCDON: string;
    GIAOHANG: boolean;
}

interface FormattedMenuItem {
  id: string;
  title: string;
  price: number;
  category: string;
}

export async function GET(request: Request) {
const { searchParams } = new URL(request.url);
const category = searchParams.get('category');

   try {
       const response = await fetch(`http://localhost:3001`, {
        method: 'GET',
         headers: {
          'Content-Type': 'application/json',
         },
         cache: 'no-store'
        });
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       const menuData: MenuItemFromBackend[] = await response.json();

       let filteredMenu;
       if (category) {
            filteredMenu = menuData.filter((item: MenuItemFromBackend) =>
                item.MUCTHUCDON.toLowerCase() === category.toLowerCase() && item.GIAOHANG === true
           );
          } else{
           filteredMenu = menuData.filter((item: MenuItemFromBackend) => item.GIAOHANG === true);
         }

        const formattedMenu: FormattedMenuItem[] = filteredMenu.map(
         (item: MenuItemFromBackend) => ({
             id: item.MAMONAN,
             title: item.TENMONAN,
             price: item.GIA,
             category: item.MUCTHUCDON,
            })
        );

      return NextResponse.json(formattedMenu);
    } catch (error) {
       console.error("Failed to fetch menu:", error)
      return NextResponse.json({ error: "Failed to fetch menu data" }, { status: 500 });
    }
}