"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import products from "../data/products";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id: productId } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("azul");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Obtener el producto por ID
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-page-container">
          <p>Producto no encontrado</p>
          <Link to="/">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  // Productos similares: misma categoría y distinto ID
  const similarProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <>
      <div className="product-page">
        <div className="product-page-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          {/* Producto principal */}
          <div className="product-main">
            {/* Galería de imágenes */}
            <div className="gallery">
              <div className="main-image card-3d">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                />
              </div>

              <div className="thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={selectedImage === index ? "active hover-lift" : "hover-lift"}
                  >
                    <img src={image} alt={`${product.name} vista ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Información del producto */}
            <div className="product-infoo">
              <h1>{product.name}</h1>

              <div className="price">
                <span className="current-price">{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
                {product.discount && <span className="discount">-{product.discount}</span>}
              </div>

              {product.rating && (
                <div className="rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= Math.floor(product.rating) ? "filled" : ""}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviews || 0} reseñas)</span>
                </div>
              )}

              <p className="description">{product.description}</p>

              {/* Selección de color */}
              {product.colors && (
                <div className="colors">
                  <h3>Color: <span>{selectedColor}</span></h3>
                  <div className="colors-options">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={selectedColor === color.name ? "active hover-lift" : "hover-lift"}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Selección de talla */}
              {product.sizes && (
                <div className="sizes">
                  <h3>Talla: {selectedSize}</h3>
                  <div className="sizes-options">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? "active" : ""}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Cantidad */}
              <div className="quantity">
                <h3>Cantidad:</h3>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              {/* Botones */}
              <div className="action-buttons">
                <button className="add-cart hover-lift">Agregar al Carrito</button>
              </div>

              {/* Características */}
              {product.features && (
                <div className="features">
                  <h3>Características:</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <span>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Productos similares */}
          {similarProducts.length > 0 && (
            <section className="similar-products">
              <h2>Productos Similares</h2>
              <div className="similar-grid">
                {similarProducts.map((sim) => (
                  <Link key={sim.id} to={`/product/${sim.id}`}>
                    <div className="card-3d hover-lift similar-card">
                      <img src={sim.images[0]} alt={sim.name} />
                      <div className="similar-info">
                        <h3>{sim.name}</h3>
                        <span>{sim.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
