"use client";
import Image from 'next/image';
import { useState } from 'react';

interface FoodCardProp {
  id: string;
  title: string;
  price: number;
  category: string;
  onAddToCart: (item: { id: string, title: string, price: number, category: string }) => void;
}

// Hàm định dạng giá (thêm dấu . sau mỗi 3 chữ số)
function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price);
  }
  
export function FoodCardOrder({ id, title, price, category, onAddToCart }: FoodCardProp) {
    const imagePath = `/${title.toLowerCase().replace(/\s+/g, "_")}.svg`;
    return (
    <div className="order-item flex flex-col items-center justify-center">
      <Image
        src={imagePath}
        alt={title}
        width={180}
        height={180}
        className="rounded-full object-cover"
      />
      <h3 className="order-item-title">{title}</h3>
      <div className="order-item-price-title">{formatPrice(price)} VND</div>
       <button className="order-add-to-cart-button" onClick={() => onAddToCart({ id, title, price, category })} style={{ alignSelf: "center" }}>Add to cart</button>
    </div>
  );
}