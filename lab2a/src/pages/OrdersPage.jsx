import { useCart } from "../hooks/useCart";

export default function OrdersPage() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <section>
        <h2>My Orders</h2>
        <p>No orders yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <article
            key={order.id}
            className="card"
            style={{ marginBottom: "1rem" }}
          >
            <p>
              Pickup {order.details.pickupTime} {"•"}
              Mahallah{order.details.mahallah}
            </p>

            {order.items.map((line) => (
              <p key={line.item.id}>
                {line.qty} × {line.item.name}
              </p>
            ))}

            <p className="price">RM {order.total.toFixed(2)}</p>
          </article>
        ))
      )}
    </section>
  );
}
