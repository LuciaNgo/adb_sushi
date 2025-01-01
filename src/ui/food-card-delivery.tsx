/*
import Image from 'next/image';
import { useState } from 'react';

interface FoodCardProps {
  title: string;
  price: number;
  onAddToCart: (item: { title: string, price: number }) => void;
}

// Hàm định dạng giá (thêm dấu . sau mỗi 3 chữ số)
function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price);
}

export function FoodCardDelivery({ title, price, onAddToCart }: FoodCardProps) {
  const imagePath = `/${title.toLowerCase().replace(/\s+/g, "_")}.svg`;
  return (
    <div className="order-">
      <Image
        src={imagePath}
        alt={title}
        width={180}
        height={180}
        className="rounded-full object-cover"
      />
      <h3 className="menu-item-title text-center">{title}</h3>
      <div className="menu-item-price-title text-center">${price}</div>
       <button className="add-to-cart-button" onClick={() => onAddToCart({ title, price })}>Add to cart</button>
    </div>
  );
}
  */

"use client";
import Image from 'next/image';
import { useState } from 'react';

interface FoodCardProps {
  title: string;
  price: number;
  onAddToCart: (item: { title: string, price: number }) => void;
}

// Hàm định dạng giá (thêm dấu . sau mỗi 3 chữ số)
function formatPrice(price: number): string {
    return new Intl.NumberFormat("vi-VN").format(price);
  }
  
export function FoodCardDelivery ({ title, price, onAddToCart }: FoodCardProps) {
    const imagePath = `/${title.toLowerCase().replace(/\s+/g, "_")}.svg`;
    return (
    <div className="menu-item flex flex-col items-center justify-center">
      <Image
        src={imagePath}
        alt={title}
        width={180}
        height={180}
        className="rounded-full object-cover"
      />
      <h3 className="menu-item-title">{title}</h3>
      <div className="menu-item-price-title">{formatPrice(price)} VND</div>
       <button className="add-to-cart-button" onClick={() => onAddToCart({ title, price })}>Add to cart</button>
    </div>
  );
}