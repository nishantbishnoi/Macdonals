import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Buy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    quantity: 1,
    paymentMethod: 'cod',
  });

  if (!product) {
    return <p style={{ color: 'red', textAlign: 'center' }}>❌ Product not found</p>;
  }

  const totalPrice = parseInt(product.price) * parseInt(formData.quantity || 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      productDescription: product.discription,
      price: product.price,
      image: product.Image,
      time: new Date().toLocaleString(),
      status: "Preparing",
    };

    const response = await fetch('http://localhost:4000/orderpost', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    const result = await response.json();
    console.log("📦 Server Response:", result);

    navigate("/order-success"); // ✅ Redirect to Thank You page
  };

  return (
    <div style={{
      maxWidth: '420px',
      margin: '30px auto',
      padding: '25px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🛒 Place Your Order</h2>

      <img
        src={product.Image}
        alt={product.discription}
        width="100%"
        height="200px"
        style={{
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '15px'
        }}
      />

      <h3 style={{ textAlign: 'center' }}>{product.discription}</h3>
      <p><strong>Unit Price:</strong> ₹{product.price}</p>
      <p><strong>Quantity:</strong> {formData.quantity}</p>
      <p style={{ fontWeight: 'bold', color: 'green' }}>Total Price: ₹{totalPrice}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={formData.customerName}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          pattern="\d{10}"
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        >
          <option value="cod">Cash on Delivery</option>
          <option value="online">Online</option>
        </select>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#28a745',
            color: 'white',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          ✅ Place Order
        </button>
      </form>
    </div>
  );
};

export default Buy;
