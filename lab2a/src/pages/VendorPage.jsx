import { useLocalStorage } from "../hooks/useLocalStorage";
import { useParams } from "react-router";

import MenuList from "../components/MenuList";
import { useVendors } from "../hooks/useVendors";
import { useCart } from "../hooks/useCart";

export default function VendorPage() {
  const { id } = useParams();

  const { vendors, loading, error } = useVendors();

  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useLocalStorage("menu-sort", "default");

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  const vendor = vendors.find((v) => String(v.id) === id);

  if (!vendor) {
    return <h2>Vendor not found</h2>;
  }

  let menuItems = [...vendor.menu];

  if (sortBy === "price-low") {
    menuItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    menuItems.sort((a, b) => b.price - a.price);
  } else if (sortBy === "popular") {
    menuItems.sort((a, b) => Number(b.popularity) - Number(a.popularity));
  }

  return (
    <section className="menu-section">
      <h2>{vendor.name}</h2>

      <p className="muted">{vendor.location}</p>

      <p className="muted">Open hours: {vendor.openHours}</p>

      <span className={`status ${vendor.isOpen ? "open" : "closed"}`}>
        {vendor.isOpen ? "Open now" : "Closed"}
      </span>

      <br />
      <br />

      <label htmlFor="sort-menu">Sort menu:</label>

      <select
        id="sort-menu"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default</option>

        <option value="price-low">Price: Low to High</option>

        <option value="price-high">Price: High to Low</option>

        <option value="popular">Most Popular</option>
      </select>

      <MenuList menu={menuItems} onAddToCart={addToCart} />
    </section>
  );
}
