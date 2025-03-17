import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.email !== "shaikzaid2006@gmail.com") {
      alert("Access Denied");
      navigate("/");
    }
    fetchProducts();
  }, [navigate]);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://ecommerce-backend-gv5k.onrender.com/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // ✅ Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://ecommerce-backend-gv5k.onrender.com/api/products/add",
        { name, description, price, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage("");
      fetchProducts(); // ✅ Refresh product list
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://ecommerce-backend-gv5k.onrender.com/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("❌ Product deleted!");
      fetchProducts(); // ✅ Refresh product list
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel - Manage Products</h2>

      {/* ✅ Add Product Form */}
      <form onSubmit={handleAddProduct}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>

      {/* ✅ Product List */}
      <h3>Existing Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <img src={product.image} alt={product.name} width="50" />
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
