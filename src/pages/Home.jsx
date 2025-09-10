"use client"
import { Link } from "react-router-dom"
import Hero from "../components/layout/Hero.jsx"
import ProductGrid from "../components/product/ProductGrid.jsx"
import NewIn from "../components/product/NewIn.jsx"
import FeaturedProduct from "../components/product/FeaturedProduct.jsx"
import ProductShowcase from "../components/product/ProductShowcase.jsx"
import GenderCategories from "../components/product/GenderCategories.jsx"

export default function Home() {
  return (
    <>
      <Hero/>
      <NewIn/>
      <ProductGrid/>
      <FeaturedProduct/>
      <ProductShowcase />
      <GenderCategories />
    </>
  )
}
