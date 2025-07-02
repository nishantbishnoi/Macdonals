// src/context/CartContext.js
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify"; // ✅ Toast

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exists = cartItems.find(i => i.discription === item.discription);
    if (exists) {
      setCartItems(prev =>
        prev.map(i =>
          i.discription === item.discription ? { ...i, qty: i.qty + 1 } : i
        )
      );
      toast.info("Quantity increased!");
    } else {
      setCartItems(prev => [...prev, { ...item, qty: 1 }]);
      toast.success("Item added to cart!");
    }
  };

  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    setCartItems(updated);
    toast.info("Quantity increased!");
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCartItems(updated);
      toast.info("Quantity decreased!");
    }
  };

  const removeFromCart = (index) => {
    const removedItem = cartItems[index];
    setCartItems(cartItems.filter((_, i) => i !== index));
    toast.error(`${removedItem.discription} removed from cart.`);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.warn("Cart cleared!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
