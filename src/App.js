import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPanel from "./admin/AdminPanel";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");

  useEffect(() => {
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
        {/* ✅ Anyone can access these pages */}
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ✅ Anyone can register and login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Only Admin Can Access Admin Panel */}
        <Route path="/admin" element={user && role === "admin" ? <AdminPanel /> : <ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
