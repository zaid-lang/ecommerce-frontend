import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";  
import Navbar from "./components/Navbar";  // ✅ Import Navbar
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./admin/AdminPanel";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    // ✅ Fetch products from backend
    axios.get("https://ecommerce-backend-gv5k.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data || []);  
      })
      .catch((error) => {
        console.error("❌ Error fetching products:", error);
        setProducts([]); 
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
      <Navbar />  {/* ✅ Add Navbar to all pages */}
      <Routes>
        {/* ✅ Home Page with Products */}
        <Route path="/" element={<ProductList products={products} />} />

        {/* ✅ Cart and Checkout Pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ✅ User Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Admin Panel (Only for Admins) */}
        <Route path="/admin" element={user && role === "admin" ? <AdminPanel /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
