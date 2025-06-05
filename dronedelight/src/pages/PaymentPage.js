import { useState } from "react";
import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/payment.css";

function PaymentPage() {
  const { order, clearOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  const totalPrice = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    city: "",
    street: "",
    houseNumber: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.email ||
      !userData.city ||
      !userData.street ||
      !userData.houseNumber ||
      !paymentMethod
    ) {
      setError("Alla fält måste fyllas i!");
      return;
    }

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderNumber,
      totalPrice,
      paymentMethod,
      user: userData,
      items: order,
      date: new Date().toISOString(),
    };

    axios
      .post("http://localhost:3001/orders", newOrder)
      .then(() => {
        toast.success(`Tack för din beställning! Ordernummer: #${orderNumber}`);
        clearOrder();
        navigate("/");
      })
      .catch((error) => console.error("Fel vid sparning av order:", error));
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">💳 Betalning</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label className="payment-label">Namn:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          required
          className="payment-input"
        />

        <label className="payment-label">Stad:</label>
        <input
          type="text"
          name="city"
          value={userData.city}
          onChange={handleChange}
          required
          className="payment-input"
        />

        <label className="payment-label">Adress:</label>
        <input
          type="text"
          name="street"
          value={userData.street}
          onChange={handleChange}
          required
          className="payment-input"
        />

        <label className="payment-label">Husnummer:</label>
        <input
          type="text"
          name="houseNumber"
          value={userData.houseNumber}
          onChange={handleChange}
          required
          className="payment-input"
        />

        <label className="payment-label">Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="payment-input"
        />

        <h3 className="payment-subtitle">Välj betalmetod:</h3>
        <div className="payment-options">
          <label className="payment-radio">
            <input
              type="radio"
              name="paymentMethod"
              value="Kreditkort"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            Kreditkort
          </label>
          <label className="payment-radio">
            <input
              type="radio"
              name="paymentMethod"
              value="Swish"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            Swish
          </label>
        </div>

        <button type="submit" className="payment-button">
          🔒 Bekräfta betalning
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
