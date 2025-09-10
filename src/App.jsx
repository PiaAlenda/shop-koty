"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastProvider } from "./contexts/ToastContext.jsx"
import { CartProvider } from "./contexts/CartContext.jsx"

import Header from "./components/layout/Header.jsx"
import Footer from "./components/layout/Footer.jsx"
import Cart from "./components/cart/Cart.jsx"
import ToastContainer from "./components/ui/ToastContainer.jsx"
import ScrollToTop from "./components/ui/ScrollToTop.jsx"

import Home from "./pages/Home.jsx"
import Categories from "./pages/Categories.jsx"
import Auth from "./pages/Auth.jsx"
import ProductDetail from "./pages/ProductDetail.jsx"

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorias/:category" element={<Categories />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
          <Cart />
          <ToastContainer />
          <ScrollToTop />
        </Router>
      </CartProvider>
    </ToastProvider>
  )
}
