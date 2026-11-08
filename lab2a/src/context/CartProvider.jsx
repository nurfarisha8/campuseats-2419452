import { CartContext } from "./cart-context";
import { useLocalStorage } from "../hooks/useLocalStorage";

function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [orders, setOrders] = useLocalStorage("orders", []);

  const count = cart.reduce((sum, line) => sum + line.qty, 0);

  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  function addToCart(item) {
    setCart((prev) => {
      const found = prev.find((line) => line.item.id === item.id);

      if (found) {
        return prev.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }

      return [...prev, { item, qty: 1 }];
    });
  }

  function changeQty(itemId, delta) {
    setCart((prev) =>
      prev
        .map((line) =>
          line.item.id === itemId
            ? {
                ...line,
                qty: line.qty + delta,
              }
            : line,
        )
        .filter((line) => line.qty > 0),
    );
  }

  function removeFromCart(itemId) {
    setCart((prev) => prev.filter((line) => line.item.id !== itemId));
  }

  const placeOrder = (details) => {
    const order = {
      id: Date.now(),
      items: cart,
      details,
      total,
      createdAt: new Date().toLocaleString(),
    };

    setOrders((prev) => [...prev, order]);

    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        count,
        total,
        addToCart,
        changeQty,
        removeFromCart,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
