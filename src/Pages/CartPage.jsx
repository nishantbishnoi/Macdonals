import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartPage.css";

const CartPage = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = parseFloat((subtotal * 0.07).toFixed(2)); // 7% tax
  const total = (subtotal + tax).toFixed(2);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.warn("🛒 Cart is empty!");
      return;
    }

    const formData = {
      customerName: "Guest", // Or collect via input
      mobileNumber: "0000000000", // Optional field
      paymentMethod: "cod",
      cartItems,
    };

    try {
      const res = await fetch("http://localhost:8100/orderpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("🧾 Order response:", result);

      if (res.ok) {
        toast.success("✅ Order placed successfully!");
        clearCart();
        navigate("/customer");
      } else {
        toast.error("❌ Order failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Checkout error:", err);
      toast.error("❌ Server error. Try later.");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>🛒 Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              removeItem={removeFromCart}
            />
          ))
        )}
      </div>

      <div className="cart-right">
        <h3>Order Summary</h3>
        <p>Subtotal ({cartItems.length} items): ₹{subtotal}</p>
        <p>Shipping: Free</p>
        <p>Tax: ₹{tax}</p>
        <hr />
        <p><strong>Total: ₹{total}</strong></p>
        <button className="checkout-btn" onClick={handleCheckout}>
          ✅ Checkout
        </button>
        <button className="continue-btn" onClick={clearCart}>
          ❌ Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
