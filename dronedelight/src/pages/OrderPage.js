import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import OrderList from "../components/OrderList";
import "../styles/order.css";

function OrderPage() {
  const { order, updateOrder, clearOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const totalPrice = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="order-container">
      <h1 className="order-title">🛒 Din Beställning</h1>
      <OrderList order={order} updateOrder={updateOrder} />
      {order.length > 0 && (
        <div className="order-summary">
          <h3 className="order-total">Totalpris: {totalPrice} kr</h3>
          <div className="order-actions">
            <button
              className="order-button"
              onClick={() => navigate("/payment")}
            >
              💳 Gå till betalning
            </button>

            <button
              className="clear-order"
              onClick={() => {
                if (
                  window.confirm(
                    "Är du säker på att du vill rensa hela varukorgen?"
                  )
                ) {
                  clearOrder();
                }
              }}
            >
              🗑️ Rensa varukorgen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
