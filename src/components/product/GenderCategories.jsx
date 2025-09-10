"use client"
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./ProductShowcase.css"

const genderCategories = [
  { id: 1, image: "/img/woman.webp", label: "Mujer", href: "/#" },
  { id: 2, image: "/img/male.webp", label: "Hombre", href: "/#" },
]

export default function GenderShowcase() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const navigate = useNavigate() 

  useEffect(() => {
    const observer = new window.IntersectionObserver(
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
        <div className="gender-grid">
          {genderCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`gender-item animate-scale-in animate-delay-${(index + 1) * 100}`}
              onClick={() => navigate(cat.href)} // <-- usamos navigate
              style={{ cursor: "pointer", position: "relative" }}
            >
              <img src={cat.image} alt={cat.label} className="gender-image" />
              <span className="showcase-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
