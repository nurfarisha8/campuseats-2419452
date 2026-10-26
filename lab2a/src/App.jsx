import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuList from "./components/MenuList.jsx";
import Footer from "./components/Footer.jsx";
import CartPage from "./components/CartPage.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";

function App() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("menu");
  const [lastOrder, setLastOrder] = useState(null);

  // B6: Sort menu by price or popularity.
  const [sortBy, setSortBy] = useState("default");

  // B2: Fetch vendors from the mock API.
  useEffect(() => {
    const controller = new AbortController();

    async function loadVendors() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/vendors.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setVendors(data);

        setSelectedVendorId((currentId) => {
          if (data.some((vendor) => vendor.id === currentId)) {
            return currentId;
          }
          return data[0]?.id ?? null;
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVendors();

    return () => controller.abort();
  }, [reloadKey]);

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId,
  );

  // B3: Add items. Repeated items increase quantity.
  function handleAddToCart(item) {
    setCart((currentCart) => {
      const existingLine = currentCart.find((line) => line.item.id === item.id);

      if (existingLine) {
        return currentCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...currentCart, { item, qty: 1 }];
    });
  }

  // B3: Change quantity. Remove a line if quantity reaches zero.
  function handleChangeQty(itemId, delta) {
    setCart((currentCart) =>
      currentCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function handleRemove(itemId) {
    setCart((currentCart) =>
      currentCart.filter((line) => line.item.id !== itemId),
    );
  }

  // Derived values: do not store these in state.
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  const cartTotal = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0,
  );

  // B5: Save the order, clear the cart and show confirmation.
  function handlePlaceOrder(details) {
    setLastOrder({
      ...details,
      total: cartTotal,
    });

    setCart([]);
    setView("done");
  }

  // B6: Sort a copy of the menu without changing the original data.
  const sortedMenu = [...(selectedVendor?.menu ?? [])];

  if (sortBy === "price-low") {
    sortedMenu.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    sortedMenu.sort((a, b) => b.price - a.price);
  } else if (sortBy === "popular") {
    sortedMenu.sort((a, b) => Number(b.popularity) - Number(a.popularity));
  }

  let content;

  if (view === "cart") {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    );
  } else if (view === "done") {
    content = (
      <section className="card order-success">
        <h2>Order placed successfully!</h2>
        <p>Thank you for ordering with CampusEats.</p>
        {lastOrder && (
          <>
            <p>Name: {lastOrder.name}</p>
            <p>Mahallah: {lastOrder.mahallah}</p>
            <p>Pickup time: {lastOrder.pickupTime}</p>
            <p>Total: RM {lastOrder.total.toFixed(2)}</p>
          </>
        )}
        <button className="btn" onClick={() => setView("menu")}>
          Back to vendors
        </button>
      </section>
    );
  } else if (loading) {
    content = <Loading />;
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((key) => key + 1)}
      />
    );
  } else {
    content = (
      <>
        <h2>Available Vendors</h2>

        <div className="vendor-grid">
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              isSelected={vendor.id === selectedVendorId}
              onSelect={() => {
                setSelectedVendorId(vendor.id);
                setSortBy("default");
              }}
            />
          ))}
        </div>

        {selectedVendor && (
          <section className="menu-section">
            <h2>{selectedVendor.name} Menu</h2>
            <p>{selectedVendor.location}</p>
            <p>Opening hours: {selectedVendor.openHours}</p>
            <p>Status: {selectedVendor.isOpen ? "Open" : "Closed"}</p>

            <label htmlFor="sort-menu">Sort menu: </label>
            <select
              id="sort-menu"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Default order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Popular Items First</option>
            </select>

            <MenuList menu={sortedMenu} onAddToCart={handleAddToCart} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView("menu")}
        onShowCart={() => setView("cart")}
      />
      <main className="container">
        <div className="app-shell">{content}</div>
      </main>
      <Footer />
    </>
  );
}

export default App;
