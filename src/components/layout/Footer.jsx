import "./Footer.css"
import { useNavigate } from "react-router-dom"
import "./Footer.css"

export default function Footer() {
  const navigate = useNavigate()

  const handleNavigate = (path) => navigate(path)

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">KOTY</h3>
            <p className="footer-description">
              Ropa urbana de alta calidad. Diseños especiales que muestran quién eres .
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <img className="social-img" src="/icons/iconsTT.png" alt="" />
              </a>
              <a href="#" className="social-link">
               <img className="social-img" src="/icons/iconIG.png" alt="" />
              </a>
              <a href="#" className="social-link">
                <img className="social-img" src="/icons/iconsTw.png" alt="" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">NAVEGACIÓN</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Sale
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Nuevo en
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Mujer & Hombre
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Colecciones
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Lookbook
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Outlet
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">AYUDA</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Guía de Talles
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <div className="payment-methods">
              <span className="payment-text">Métodos de pago:</span>
              <div className="payment-icons">
                <span>💳</span>
                <span>🏦</span>
                <span>💰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">© 2025 KOTY. Todos los derechos reservados.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">
                Política de Privacidad
              </a>
              <a href="#" className="footer-bottom-link">
                Términos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
