import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./admin/AdminPanel";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    axios
      .get("https://ecommerce-backend-gv5k.onrender.com/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));

    // Check if user is logged in (JWT exists)
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - Only logged-in users can access */}
        <Route path="/" element={user ? <ProductList products={products} addToCart={addToCart} /> : <Navigate to="/login" />} />
        <Route path="/cart" element={user ? <Cart cart={cart} /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
