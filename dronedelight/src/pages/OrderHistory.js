import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/history.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => setOrders(response.data))
      .catch((error) =>
        console.error("Fel vid hämtning av beställningar:", error)
      );
  }, []);

  return (
    <div className="history-container">
      <h1 className="history-title">📜 Beställningshistorik</h1>
      {orders.length === 0 ? (
        <p className="history-empty">Ingen beställningshistorik hittades.</p>
      ) : (
        <ul className="history-list">
          {orders.map((order) => (
            <li key={order.orderNumber} className="history-item">
              <div className="history-header">
                <h3>Ordernummer: #{order.orderNumber}</h3>
                <p className="history-date">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <div className="history-user-info">
                <p>
                  <strong>Namn:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Stad:</strong> {order.user.city}
                </p>
                <p>
                  <strong>Gatunamn:</strong> {order.user.street}
                </p>
                <p>
                  <strong>Husnummer:</strong> {order.user.houseNumber}
                </p>
                <p>
                  <strong>Email:</strong> {order.user.email}
                </p>
              </div>

              <p className="history-total">
                <strong>Totalpris:</strong> {order.totalPrice} kr
              </p>
              <p className="history-payment">
                <strong>Betalmetod:</strong> {order.paymentMethod}
              </p>

              <div className="history-details">
                <h4>Beställda varor:</h4>
                <ul className="history-products">
                  {order.items.map((item) => (
                    <li key={item.id} className="history-product">
                      {item.name} - {item.quantity} st (
                      {item.price * item.quantity} kr)
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
