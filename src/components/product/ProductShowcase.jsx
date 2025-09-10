"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./ProductShowcase.css"

const showcaseCategories = [
  { id: 1, image: "/img/camisaFooter.webp", label: "Camisas", href: "/categorias/Camisas" },
  { id: 2, image: "/img/remeraFooter.webp", label: "Remeras", href: "/categorias/Remeras" },
  { id: 3, image: "/img/buzoFooter.webp", label: "Buzos", href: "/categorias/Buzos" },
  { id: 4, image: "/img/pantalonFooter.webp", label: "Pantalones", href: "/categorias/Pantalones" },
]

export default function ProductShowcase() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`showcase-section fade-in-on-scroll${visible ? " visible" : ""}`}
    >
      <div className="container">
        <div className="showcase-grid-top">
          {showcaseCategories.map((cat, index) => (
            <Link
              key={cat.id}
              to={cat.href}
              className={`showcase-item animate-scale-in animate-delay-${(index + 1) * 100}`}
            >
              <img src={cat.image} alt={cat.label} className="showcase-image" />
              <span className="showcase-label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
