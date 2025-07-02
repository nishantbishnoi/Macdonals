// src/OrderSuccess.js

import React from 'react';

const OrderSuccess = () => {
  return (
    <div style={{
      height: "100vh",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#28a745", fontSize: "36px" }}>✅ Order Confirmed</h1>
      <p style={{ fontSize: "20px", color: "#333" }}>Thank you for your order!</p>
    </div>
  );
};

export default OrderSuccess;
