import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuItem = ({ item, addToOrder }) => {
  return (
    <div className="menu-item">
      <img src={`/${item.image}`} alt={item.name} className="menu-img" />{" "}
      <h3>{item.name}</h3>
      <p>Pris: {item.price} kr</p>
      <button
        className="order-button"
        onClick={() => {
          addToOrder(item);
          toast.success(`${item.name} har lagts till i beställningen!`, {
            position: "top-center",
          });
        }}
      >
        Lägg till i beställning
      </button>
    </div>
  );
};

export default MenuItem;
