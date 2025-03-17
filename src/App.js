import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from backend API
  useEffect(() => {
    axios.get("https://ecommerce-backend-gv5k.onrender.com/api/products")
    .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>E-Commerce Website</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} />
      <Checkout cart={cart} />
    </div>
  );
}

export default App;
