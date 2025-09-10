"use client"

import { useState, useEffect } from "react"
import "./SearchModal.css"

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Mock search data - in a real app this would come from an API
  const allProducts = [
    { id: 1, name: "REMERA BASIC FIT NEGRO", price: "$24.990", image: "" },
    { id: 2, name: "BUZO KANGURO OFF WHITE", price: "$59.990", image: "" },
    { id: 3, name: "REMERA BASIC FIT AZUL", price: "$24.990", image: "" },
    { id: 5, name: "BUZO BASIC NEGRO", price: "$149.990", image: "" },
    { id: 6, name: "CAMPERA PIEL", price: "$89.990", image: "" },
    { id: 7, name: "REMERA NEGRA", price: "$29.990", image: "" },
    { id: 8, name: "BUZO AZUL KONGO", price: "$149.990", image: "" },
  ]

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchTerm])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setSearchTerm("")
      setSearchResults([])
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button className="search-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="search-results">
          {searchTerm.length > 0 && searchResults.length === 0 && (
            <div className="no-results">
              <p>No se encontraron productos para "{searchTerm}"</p>
            </div>
          )}

          {searchResults.map((product) => (
            <div key={product.id} className="search-result-item animate-fade-in-up">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="result-image" />
              <div className="result-info">
                <h3 className="result-name">{product.name}</h3>
                <p className="result-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {searchTerm.length === 0 && (
          <div className="search-suggestions">
            <h3>Búsquedas populares</h3>
            <div className="suggestion-tags">
              <button className="suggestion-tag" onClick={() => setSearchTerm("remera")}>
                Remeras
              </button>
              <button className="suggestion-tag" onClick={() => setSearchTerm("buzo")}>
                Buzos
              </button>
              <button className="suggestion-tag" onClick={() => setSearchTerm("negro")}>
                Negro
              </button>
              <button className="suggestion-tag" onClick={() => setSearchTerm("basic")}>
                Basic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
