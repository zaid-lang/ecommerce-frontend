import React from "react";

function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    // Here you would integrate a payment gateway like Stripe
    alert("Proceed to payment gateway.");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Checkout;
