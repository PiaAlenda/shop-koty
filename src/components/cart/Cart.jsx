"use client";

import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import products from "../../data/products"; 
import "./Cart.css";

export default function Cart() {
  const { items, isOpen, removeFromCart, updateQuantity, clearCart, toggleCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={toggleCart}>
      <div className="cart-sidebar animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Tu Carrito</h2>
          <button className="cart-close" onClick={toggleCart}>
            &times;
          </button>
        </div>

        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <button
                className="continue-shopping"
                onClick={() => {
                  toggleCart();
                  navigate("/");
                }}
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((cartItem) => {
                  const product = products.find((p) => p.id === cartItem.id);

                  if (!product) return null; 

                  return (
                    <div key={product.id} className="cart-item animate-fade-in-up">
                      <div className={`cart-item-image-container ${product.backImage ? "has-back" : ""}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="cart-item-image front"
                        />
                        {product.backImage && (
                          <img
                            src={product.backImage}
                            alt={`${product.name} back`}
                            className="cart-item-image back"
                          />
                        )}
                      </div>

                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{product.name}</h3>
                        <p className="cart-item-price">{product.price}</p>

                        <div className="cart-item-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="quantity">{cartItem.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button className="remove-item" onClick={() => removeFromCart(product.id)}>
                        <img className="icon" src="/icons/iconsPapelera.gif" alt="Eliminar" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <p className="total-text">
                    Total: ${getTotalPrice().toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart-btn" onClick={clearCart}>
                    Vaciar Carrito
                  </button>
                  <button className="checkout-btn" onClick={() => navigate("/#")}>
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
