"use client"

import { useState, useRef, useEffect } from "react"
import { useCart } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom"
import { products } from "../../data/products"
import "./ProductGrid.css"

export default function ProductGrid() {
  const { addToCart } = useCart()
  const [current, setCurrent] = useState(0)
  const [showBuyModal, setShowBuyModal] = useState(null)
  const [selectedSize, setSelectedSize] = useState("M")
  const [animatedIndex, setAnimatedIndex] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visibleCount, setVisibleCount] = useState(4) // dinámico según pantalla
  const sectionRef = useRef(null)
  const navigate = useNavigate()

  // 🔹 Detectar ancho de pantalla para decidir cuántos productos mostrar
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 480) {
        setVisibleCount(1) // móvil: 1 producto
      } else if (window.innerWidth <= 768) {
        setVisibleCount(2) // tablet: 2 productos
      } else {
        setVisibleCount(4) // desktop: 4 productos
      }
    }

    updateVisibleCount()
    window.addEventListener("resize", updateVisibleCount)
    return () => window.removeEventListener("resize", updateVisibleCount)
  }, [])

  // 🔹 Detectar si la sección entra en viewport
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleNext = () => {
    const nextIndex = current >= products.length - visibleCount ? 0 : current + 1
    setAnimatedIndex((current + visibleCount) % products.length)
    setCurrent(nextIndex)
    setTimeout(() => setAnimatedIndex(null), 500)
  }

  const handlePrev = () => {
    const prevIndex = current === 0 ? products.length - visibleCount : current - 1
    setAnimatedIndex(prevIndex)
    setCurrent(prevIndex)
    setTimeout(() => setAnimatedIndex(null), 500)
  }

  const handleView = (product) => navigate(`/producto/${product.id}`)
  const handleBuy = (productId) => setShowBuyModal(productId)
  const handleAddToCart = (product) => {
    addToCart({ ...product, size: selectedSize })
    setShowBuyModal(null)
  }

  // 🔹 Productos visibles según índice y cantidad
  const visibleProducts = []
  for (let i = 0; i < visibleCount; i++) {
    visibleProducts.push(products[(current + i) % products.length])
  }

  return (
    <section
      ref={sectionRef}
      className={`product-grid-section fade-in-on-scroll${visible ? " visible" : ""}`}
    >
      <div className="container">
        <h2 className="section-title animate-fade-in-up">EN INVIERNO SALE HASTA 70% OFF</h2>

        <div className="carousel-wrapper">
          <button className="carousel-arrow left" onClick={handlePrev} aria-label="Anterior">
            {"<"}
          </button>

          <div className="product-grid carousel-product-grid">
            {visibleProducts.map((product, index) => (
              <div
                key={product.id}
                className={`product-card animate-fade-in-up animate-delay-${(index + 1) * 100} ${
                  animatedIndex === (current + index) % products.length ? "slide-up" : ""
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
            ))}
          </div>

          <button className="carousel-arrow right" onClick={handleNext} aria-label="Siguiente">
            {">"}
          </button>
        </div>
      </div>
      <hr className="section-divider" />
    </section>
  )
}
