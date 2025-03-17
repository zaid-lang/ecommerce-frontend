import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";  // ✅ Import axios
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./admin/AdminPanel";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [products, setProducts] = useState([]); // ✅ Add state for products

  useEffect(() => {
    // ✅ Fetch products from backend
    axios.get("https://ecommerce-backend-gv5k.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data || []);  // ✅ Ensure products is always an array
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setProducts([]); // ✅ Prevents undefined error
      });

    // ✅ Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setRole(parsedUser.email === "shaikzaid2006@gmail.com" ? "admin" : "user");
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* ✅ Pass products as props */}
        <Route path="/" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ✅ Anyone can register and login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Only Admin Can Access Admin Panel */}
        <Route path="/admin" element={user && role === "admin" ? <AdminPanel /> : <ProductList products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;
