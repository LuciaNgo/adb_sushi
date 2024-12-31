interface MenuCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
}

export function FoodCard({ title, description, price, image }: MenuCardProps) {
  return (
    <div className="menu-item">
      <img src={image} alt={title} className="menu-item-image" />
      <div className="menu-item-price">${price}</div>
      <h3 className="menu-item-title">{title}</h3>
      <p className="menu-item-description">{description}</p>
    </div>
  );
}

