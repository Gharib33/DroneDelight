import { createContext, useState, useEffect } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((i) => i.id === item.id);
      if (existingItem) {
        return prevOrder.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const updateOrder = (item, action) => {
    setOrder((prevOrder) => {
      if (action === "increase") {
        return prevOrder.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      if (action === "decrease") {
        return prevOrder.map((i) =>
          i.id === item.id && i.quantity > 1
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      }
      if (action === "remove") {
        return prevOrder.filter((i) => i.id !== item.id);
      }
      return prevOrder;
    });
  };

  const clearOrder = () => {
    setOrder([]);
    localStorage.removeItem("order");
  };

  return (
    <OrderContext.Provider
      value={{ order, addToOrder, updateOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};
