"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { products } from "../data/products" // importa tu lista de productos
import "./Categories.css"

export default function Categories() {
  const { category } = useParams()
  const { addToCart } = useCart()
  const [showBuyModal, setShowBuyModal] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [animatedIndex, setAnimatedIndex] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate()

  // Filtramos productos por categoría
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleView = (product) => navigate(`/producto/${product.id}`)
  const handleBuy = (productId) => setShowBuyModal(productId)
  const handleAddToCart = (product) => {
    addToCart({ ...product, size: selectedSize })
    setShowBuyModal(null)
  }

  return (
    <section
      ref={sectionRef}
      className={`product-grid-section fade-in-on-scroll${visible ? " visible" : ""}`}
    >
      <div className="container">
        <h2 className="section-title animate-fade-in-up">{category}</h2>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-card ${showBuyModal === product.id ? "show-modal" : ""} 
                  animate-fade-in-up animate-delay-${(index + 1) * 100} ${
                  animatedIndex === index ? "slide-up" : ""
                }`}
              >
                <div className="product-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={`product-image front ${product.images[1] ? "has-back" : ""}`}
                  />
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} back`}
                      className="product-image back"
                    />
                  )}

                  {product.discount && <span className="discount-badge">{product.discount}</span>}

                  {showBuyModal === product.id && (
                    <div className="buy-modal">
                      <span className="modal-title">Talle</span>
                      <div className="size-options">
                        {["S", "M", "L", "XL"].map((size) => (
                          <button
                            key={size}
                            className={`size-btn${selectedSize === size ? " selected" : ""}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                        Añadir al carrito
                      </button>
                      <button className="close-modal-btn" onClick={() => setShowBuyModal(null)}>
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-pricing">
                    <span className="current-price">{product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="installments">6 cuotas sin interés de $4.165,00</p>
                  <div className="product-action-buttons">
                    <button className="buy-btn" onClick={() => handleBuy(product.id)}>COMPRAR</button>
                    <button className="view-btn" onClick={() => handleView(product)}>
                      <img className="icon" src="/icons/iconsOjo.png" alt="ojo" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
        </div>
      </div>
      <hr className="section-divider" />
    </section>
  )
}
