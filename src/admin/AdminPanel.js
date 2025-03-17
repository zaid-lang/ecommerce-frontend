import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: "" });

  // Fetch products from backend
  useEffect(() => {
    axios.get("https://ecommerce-backend-gv5k.onrender.com/api/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Add a new product
  const addProduct = () => {
    axios.post("https://ecommerce-backend-gv5k.onrender.com/api/products", newProduct)
      .then(response => setProducts([...products, response.data]))
      .catch(error => console.error("Error adding product:", error));
  };

  // Delete a product
  const deleteProduct = (id) => {
    axios.delete(`https://ecommerce-backend-gv5k.onrender.com/api/products/${id}`)
      .then(() => setProducts(products.filter(product => product._id !== id)))
      .catch(error => console.error("Error deleting product:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>
      
      {/* Form to Add a New Product */}
      <div>
        <input type="text" placeholder="Product Name" onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="text" placeholder="Description" onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input type="number" placeholder="Price" onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="text" placeholder="Image URL" onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* List of Products with Delete Option */}
      <div>
        <h3>Product List</h3>
        {products.map(product => (
          <div key={product._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <img src={product.image} alt={product.name} width="100" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
