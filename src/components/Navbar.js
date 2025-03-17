import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/cart">Cart</Link> | 
      <Link to="/checkout">Checkout</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/signup">Sign Up</Link> | 
      <Link to="/admin">Admin Panel</Link>
    </nav>
  );
}

export default Navbar;
