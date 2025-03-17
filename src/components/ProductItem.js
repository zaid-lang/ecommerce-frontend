import React from "react";

function ProductItem({ product, addToCart }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      margin: "1rem",
      width: "200px"
    }}>
      <img src={product.image} alt={product.name} style={{ width: "100%" }} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
