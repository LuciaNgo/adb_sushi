import Image from "next/image";

interface MenuCardProps {
  title: string;
  price: number;
}

export function FoodCard({ title, price }: MenuCardProps) {
  // Tạo đường dẫn ảnh dựa trên tiêu đề
  const imagePath = `/${title.toLowerCase().replace(/\s+/g, "_")}.svg`;

  return (
    <div className="menu-item">
      <Image
        src={imagePath}
        alt={title}
        width={180}
        height={180}
        className="rounded-full object-cover"
      />
      <div className="menu-item-price">${price}</div>
      <h3 className="menu-item-title text-center">{title}</h3>
    </div>
  );
}


/*
import Image from "next/image";

interface MenuCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export function FoodCard({ title, description, price, image }: MenuCardProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center p-4">
    <div className="relative">
      <Image
         src="/fish_and_veggie.svg"
          alt={title}
          width={180}
          height={180}
           className="rounded-full object-cover"
      />
      <div className="absolute -right-2 -top-2 bg-[#1B1B1B] text-white px-3 py-1 rounded-full">
          ${price}
      </div>
  </div>
  <h3 className="mt-4 text-xl font-semibold text-center">{title}</h3>
  <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>
</div>
  );
}
  */