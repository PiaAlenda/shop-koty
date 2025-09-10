import { useState, useRef, useEffect } from "react"
import "./Hero.css"

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [footerCurrent, setFooterCurrent] = useState(0)
  const [carouselVisible, setCarouselVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const carouselRef = useRef(null)
  const footerRef = useRef(null)

  const heroImages = [
    { src: "/img/descuento.webp", alt: "Descuento" },
    { src: "/img/descuento2.webp", alt: "Cuotas sin interés" },
    { src: "/img/descuento.webp", alt: "Cuotas sin interés" },
    { src: "/img/descuento2.webp", alt: "Winter Sale" },
  ]

  const footerSlides = [
    {
      icon: "/icons/iconsCamion.png",
      title: "Envío gratis",
      text: "En compras mayores a $70.000",
    },
    {
      icon: "/icons/iconsTarjeta.png",
      title: "6 cuotas sin interés",
      text: "En compras a partir de $50.000. Y más cuotas desde $130.000",
    },
  ]

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  const handleFooterPrev = () => {
    setFooterCurrent((prev) => (prev === 0 ? footerSlides.length - 1 : prev - 1))
  }

  const handleFooterNext = () => {
    setFooterCurrent((prev) => (prev === footerSlides.length - 1 ? 0 : prev + 1))
  }

  const image = heroImages[current]
  const footerSlide = footerSlides[footerCurrent]

  // Animación al hacer scroll
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setCarouselVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (carouselRef.current) observer.observe(carouselRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" className="hero">
      {/* Carrusel de imágenes grandes */}
      <div
        className={`hero-banner-carousel-full fade-in-on-scroll${carouselVisible ? " visible" : ""}`}
        ref={carouselRef}
      >
        <button className="hero-carousel-arrow left" onClick={handlePrev} aria-label="Anterior">
          {"<"}
        </button>
        <div className="hero-banner-image-full">
          <img src={image.src} alt={image.alt} className="banner-img-full" />
        </div>
        <button className="hero-carousel-arrow right" onClick={handleNext} aria-label="Siguiente">
          {">"}
        </button>
      </div>

      {/* Footer con slider en responsive */}
      <div
        className={`hero-footer fade-in-on-scroll${footerVisible ? " visible" : ""}`}
        ref={footerRef}
      >
        {/* Desktop: muestra ambos */}
        <div className="footer-desktop">
          <div className="shipping-info">
            <span className="shipping-icon">
              <img src="/icons/iconsCamion.png" alt="Camión" className="icon" />
            </span>
            <div>
              <p>Envío gratis</p>
              <p>En compras mayores a $70.000</p>
            </div>
          </div>
          <div className="payment-info">
            <span className="payment-icon">
              <img src="/icons/iconsTarjeta.png" alt="Tarjeta" className="icon" />
            </span>
            <div>
              <p>6 cuotas sin interés en tus compras a partir de $50.000</p>
              <p>Más cuotas sin interés desde $130.000</p>
            </div>
          </div>
        </div>

        {/* Mobile: slider */}
        <div className="footer-mobile">
          <button className="footer-arrow left" onClick={handleFooterPrev}>
            {"<"}
          </button>
          <div className="footer-slide">
            <span className="footer-icon">
              <img src={footerSlide.icon} alt="icon" className="icon" />
            </span>
            <div>
              <p>{footerSlide.title}</p>
              <p>{footerSlide.text}</p>
            </div>
          </div>
          <button className="footer-arrow right" onClick={handleFooterNext}>
            {">"}
          </button>
        </div>
      </div>
    </section>
  )
}
