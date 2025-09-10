"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MobileMenu.css"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate() // <-- Inicializamos navigate

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavigate = (path) => {
    navigate(path) // Navegamos internamente
    setIsOpen(false) // Cerramos el menú
  }

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span className={`hamburger ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className={`mobile-menu-overlay ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <nav className={`mobile-menu ${isOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <span className="mobile-logo">KOTY</span>
            <button className="mobile-menu-close" onClick={toggleMenu}> × </button>
          </div>

          <div className="mobile-menu-links">
            <button className="mobile-nav-link" onClick={() => handleNavigate("/sale")}>SALE</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/nuevo-en")}>NEW IN</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/mujer-hombre")}>MUJER & HOMBRE</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/colecciones")}>COLECCIONES</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/revista")}>REVISTA</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/nosotros")}>NOSOTROS</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/puntos-de-venta")}>PUNTOS DE VENTA</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/outlet")}>OUTLET</button>
            <button className="mobile-nav-link" onClick={() => handleNavigate("/buzos")}>BUZOS</button>
          </div>
        </nav>
      </div>
    </>
  )
}
