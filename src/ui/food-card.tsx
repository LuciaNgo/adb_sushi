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