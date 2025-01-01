"use client";
import Image from 'next/image';
import { useState } from 'react';

interface FoodCardProp {
  title: string;
  price: number;
  onAddToCart: (item: { title: string, price: number }) => void;
}

// Hàm định dạng giá (thêm dấu . sau mỗi 3 chữ số)
function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price);
  }
  
export function FoodCardOrder({ title, price, onAddToCart }: FoodCardProp) {
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
       <button className="order-add-to-cart-button" onClick={() => onAddToCart({ title, price })} style={{ alignSelf: "center" }}>Add to cart</button>
    </div>
  );
}