"use client";

import { useParams, Link } from "react-router-dom";
import products from "../data/products"; 
import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams(); 
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">
      <h1 className="category-title">{category}</h1>

      {filteredProducts.length === 0 ? (
        <p>No hay productos en esta categoría.</p>
      ) : (
        <div className="category-grid">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="category-card hover-lift"
            >
              <img src={product.image} alt={product.name} />
              <div className="category-info">
                <h3>{product.name}</h3>
                <span>{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
