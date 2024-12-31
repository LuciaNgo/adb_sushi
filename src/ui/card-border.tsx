/*
import { FoodCardBorder } from "./food-card-border";

interface FoodCardProps {
    title: string;
    description: string;
    price: number;
    image: string;
}

export function CardBorder({ title, description, price, image }: FoodCardProps) {
    return (
        <div className="relative w-[248px] h-[290px]">
            <FoodCardBorder />
            <div className="relative h-full p-4 flex flex-col items-center">
                <div className="relative">
                    <img
                        src={image}
                        alt={title}
                        className="w-[180px] h-[180px] rounded-full object-cover"
                    />
                    <div className="absolute -right-2 -top-2 bg-[#1B1B1B] text-white px-3 py-1 rounded-full">
                        ${price}
                    </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>
            </div>
        </div>
    );
}
*/
import Image from "next/image";

export function CardBorder() {
  return (
     <Image src="/food-card-border.svg" alt="food card border" fill style={{ objectFit: "cover" }} />
  );
}
