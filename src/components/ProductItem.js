import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px", width: "200px" }}>
      <img 
        src={product.image || "https://via.placeholder.com/200"} 
        alt={product.name} 
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
