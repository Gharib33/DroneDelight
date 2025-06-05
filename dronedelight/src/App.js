import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import RestaurantList from "./pages/RestaurantList";
import PaymentPage from "./pages/PaymentPage";
import OrderHistory from "./pages/OrderHistory";
import { ToastContainer } from "react-toastify";
import { OrderProvider } from "./context/OrderContext";
import "./styles/global.css";

function App() {
  return (
    <OrderProvider>
      <ToastContainer />
      <Router>
        <nav className="navbar">
          <a href="/" className="nav-link">
            Restauranger
          </a>
          <a href="/order" className="nav-link">
            Varukorg
          </a>
          <a href="/order-history" className="nav-link">
            Historik
          </a>
        </nav>
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/menu/:restaurantId" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
