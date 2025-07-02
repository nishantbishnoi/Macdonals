import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const [message, setMessage] = useState("Confirming payment...") ;
  const [params] = useSearchParams();

  useEffect(() => {
    const orderId = params.get("orderId");

    if (orderId) {
      axios.post("http://localhost:8100/buy/payment-confirmation", {
        orderId,
        paymentStatus: "Paid",
      }).then(() => {
        setMessage("✅ Payment successful. Your order is confirmed!");
      }).catch(() => {
        setMessage("❌ Payment received but order confirmation failed.");
      });
    } else {
      setMessage("Invalid or missing order ID.");
    }
  }, [params]);

  return (
    <div className="confirmed-box">
      <h2>{message}</h2>
    </div>
  );
};

export default Success;
