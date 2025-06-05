import React from "react";
import { toast } from "react-toastify";

const OrderList = ({ order, updateOrder }) => {
  return (
    <div>
      <h2>Din varukorg</h2>
      {order.length === 0 ? <p>Din varukorg är tom.</p> : null}
      {order.map((item) => (
        <div key={item.id} className="order-item">
          <h4>
            {item.name} ({item.quantity} st)
          </h4>
          <p>{item.price * item.quantity} kr</p>

          <button
            onClick={() => {
              updateOrder(item, "increase");
              toast.success(`Lagt till en ${item.name}`, {
                position: "top-right",
              });
            }}
          >
            ➕
          </button>

          <button
            onClick={() => {
              if (item.quantity <= 1) {
                updateOrder(item, "remove");
                toast.warning(`${item.name} togs bort från beställningen`, {
                  position: "top-right",
                });
              } else {
                updateOrder(item, "decrease");
                toast.warning(`Tagit bort en ${item.name}`, {
                  position: "top-right",
                });
              }
            }}
          >
            ➖
          </button>

          <button
            onClick={() => {
              updateOrder(item, "remove");
              toast.error(`Tog bort ${item.name}`, { position: "top-right" });
            }}
          >
            ❌ Ta bort
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
