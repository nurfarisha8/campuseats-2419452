import MenuItemCard from "./MenuItemCard.jsx";

function MenuList({ menu, onAddToCart }) {
  if (menu.length === 0) {
    return <p>No menu items available.</p>;
  }

  return (
    <div className="menu-grid">
      {menu.map((item) => (
        <MenuItemCard key={item.id} item={item} onAdd={onAddToCart} />
      ))}
    </div>
  );
}

export default MenuList;
