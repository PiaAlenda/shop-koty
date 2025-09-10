"use client"
import { useState } from "react"
import { useCart } from "../../contexts/CartContext"
import SearchModal from "../ui/SearchModal"
import { Link } from "react-router-dom" // <-- IMPORTAR LINK
import "./Header.css"

const dropdownLinks = {
  prendas: [
    { label: "Remeras", href: "#" },
    { label: "Pantalones", href: "#" },
    { label: "Buzos", href: "#" },
  ],
  presale: [
    { label: "Proximos Lanzamientos", href: "#" },
    { label: "Reservas", href: "#" },
  ],
  accesorios: [
    { label: "Gorras", href: "#" },
    { label: "Bolsos", href: "#" },
    { label: "Cinturones", href: "#" },
  ],
}

const dropdownMenus = ["VENTA", "NUEVO EN", "HOMBRE", "MUJER", "AYUDA"]

export default function Header() {
  const { toggleCart, getTotalItems } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <>
      <header className="header animate-fade-in">
        <div className="header-banner">
          <div className="banner-track">
            <h1>
              ENVIOS GRATIS superando los $200.000🌟 PAGA HASTA EN 4 y 8 CUOTAS
              SIN INTERÉS con Visa y Master🌟 PAGA EN 2, 3 y 4 CUOTAS SIN
              INTERÉS con TARJETA DE DÉBITO 💳
            </h1>
            <h1>
              ENVIOS GRATIS superando los $200.000🌟 PAGA HASTA EN 4 y 8 CUOTAS
              SIN INTERÉS con Visa y Master🌟 PAGA EN 2, 3 y 4 CUOTAS SIN
              INTERÉS con TARJETA DE DÉBITO 💳
            </h1>
          </div>
        </div>

        <div className="header-container">
          <div className="logo animate-scale-in animate-delay-100">
            <span className="logo-text">
              <Link to="/">KOTY</Link>
            </span>
          </div>

          <nav className="nav animate-slide-in-left animate-delay-200">
            {dropdownMenus.map((menu) => (
              <div key={menu} className="nav-dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => handleDropdownToggle(menu)}
                  onMouseEnter={() => setOpenDropdown(menu)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {menu}
                </button>
                {openDropdown === menu && (
                  <div
                    className="dropdown-menu"
                    onMouseEnter={() => setOpenDropdown(menu)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="dropdown-section">
                      <span className="dropdown-title">Prendas</span>
                      {dropdownLinks.prendas.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href} 
                          className="dropdown-item"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="dropdown-section">
                      <span className="dropdown-title">Pre-sale</span>
                      {dropdownLinks.presale.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="dropdown-item"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="dropdown-section">
                      <span className="dropdown-title">Accesorios</span>
                      {dropdownLinks.accesorios.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="dropdown-item"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link to="#" className="nav-link">
              STORES
            </Link>
            <Link to="#looks" className="nav-link">
              TOTAL LOOKS
            </Link>
          </nav>

          <div className="header-actions animate-slide-in-right animate-delay-300">
            <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
              <img src="/icons/iconsLupa.png" alt="Buscar" className="icon" />
            </button>

            <button className="account-btn">
              <img src="/icons/iconsUsuario.png" alt="Cuenta" className="icon" />
            </button>

            <button className="cart-btn" onClick={toggleCart}>
              <img src="/icons/iconsBolsa.gif" alt="Carrito" className="icon" />
              {getTotalItems() > 0 && (
                <span className="cart-counter animate-bounce-gentle">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
