import React, { useState } from 'react';
import BarcodeScanner from 'react-qr-barcode-scanner';

const PaymentConfirmation = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleScan = (err, result) => {
    if (result) {
      // Assuming the QR code contains the order ID and payment status
      const { orderId, status } = JSON.parse(result.text);
      if (status === 'Paid') {
        setPaymentStatus(`Payment confirmed for Order ID: ${orderId}`);
      } else {
        setPaymentStatus('Payment failed or pending.');
      }
    }
  };

  return (
    <div>
      <h2>Scan QR Code for Payment Confirmation</h2>
      <BarcodeScanner
        onUpdate={handleScan}
        width="100%"
        height="400px"
        facingMode="environment"
      />
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentConfirmation;
