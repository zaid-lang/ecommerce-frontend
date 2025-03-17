import React from "react";
import ProductItem from "./ProductItem";

function ProductList({ products = [], addToCart }) {  // ✅ Default value []
  return (
    <div>
      <h2>Products</h2>
      {products && products.length === 0 ? (   // ✅ Check if products exist
        <p>No products available.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
