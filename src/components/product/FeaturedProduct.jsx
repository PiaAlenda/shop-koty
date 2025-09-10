"use client"
import { useState } from "react"
import "./FeaturedProduct.css"
import { useNavigate } from "react-router-dom" // <-- importamos navigate

const outfits = [
  {
    mainImage: "/img/conjuntoBlanco.webp",
    mainPrice: "$ 200.999,00",
    title: "REMERA BLANCA Y NEGRA",
    items: [
      { image: "/img/blancaConjunto.webp", name: "REMERA BLANCA", price: "$ 130.990,00" },
      { image: "/img/blancoConjunto.webp", name: "JOGGING", price: "$ 120.990,00" },
    ],
  },
  {
    mainImage: "/img/conjuntoNegro.webp",
    mainPrice: "$ 210.999,00",
    title: "REMERA NEGRA Y PANTALÓN",
    items: [
      { image: "/img/negraConjunto.webp", name: "REMERA NEGRA", price: "$ 135.990,00" },
      { image: "/img/negroConjunto.webp", name: "JOGGING NEGRO", price: "$ 125.990,00" },
    ],
  },
]

export default function FeaturedProduct() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate() 
  const handleNext = () => setCurrent((prev) => (prev + 1) % outfits.length)
  const outfit = outfits[current]

  const handleBuyLook = () => {

  }

  return (
    <section id="looks" className="featured-section">
      <div className="container">
        <h2 className="featured-title animate-fade-in-up">¡ADQUIERE EL CONJUNTO COMPLETO!</h2>

        <div className="featured-content animate-fade-in animate-delay-200">
          <div className="featured-main-product animate-scale-in animate-delay-300">
            <img src={outfit.mainImage} alt="Conjunto completo" className="featured-main-image" />
            <div className="featured-main-price">
              <span className="featured-price">{outfit.mainPrice}</span>
            </div>
          </div>

          <div className="featured-breakdown animate-slide-in-right animate-delay-400">
            <h3 className="breakdown-title">{outfit.title}</h3>
            <div className="breakdown-items">
              {outfit.items.map((item, idx) => (
                <div key={idx} className="breakdown-item animate-fade-in-up animate-delay-500">
                  <img src={item.image} alt={item.name} className="breakdown-image" />
                  <div className="breakdown-info">
                    <p className="breakdown-name">{item.name}</p>
                    <p className="breakdown-price">{item.price}</p>
                  </div>
                  <button className="breakdown-btn">+</button>
                </div>
              ))}
            </div>
            <button
              className="comprar-look-btn animate-bounce-gentle animate-delay-700"
              onClick={handleBuyLook}
            >
              COMPRAR LOOK
            </button>
          </div>

          <button
            className="next-outfit-btn"
            onClick={handleNext}
            aria-label="Siguiente conjunto"
          >
            <img className="icon" src="/icons/iconsFlecha.gif" alt="flecha" />
          </button>
        </div>
      </div>
    </section>
  )
}
