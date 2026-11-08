import { useCart } from "../hooks/useCart";
import CartItem from "../components/CartItem.jsx";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useNavigate } from "react-router";

function CartPage() {
  const { cart, changeQty, removeFromCart, placeOrder } = useCart();

  const navigate = useNavigate();
  function handlePlaceOrder(details) {
    placeOrder(details);
    navigate("/orders");
  }

  if (cart.length === 0) {
    return (
      <section className="card">
        <h2>Your Cart</h2>
        <p className="muted">
          Your cart is empty. Pick something from a menu first.
        </p>
      </section>
    );
  }

  const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0);

  return (
    <section>
      <h2>Your Cart</h2>

      <div className="cart-layout">
        <div className="card">
          <ul className="cart-list">
            {cart.map((line) => (
              <CartItem
                key={line.item.id}
                line={line}
                onChangeQty={changeQty}
                onRemove={removeFromCart}
              />
            ))}
          </ul>

          <p className="cart-total">Total: RM {total.toFixed(2)}</p>
        </div>

        <CheckoutForm onPlaceOrder={handlePlaceOrder} />
      </div>
    </section>
  );
}

export default CartPage;
