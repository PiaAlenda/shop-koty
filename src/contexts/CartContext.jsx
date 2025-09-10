"use client"
import { createContext, useContext, useReducer } from "react"
import { useToast } from "./ToastContext"

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) => (item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item))
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    default:
      return state
  }
}

const initialState = { items: [], isOpen: false }

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const { showToast } = useToast()

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
    showToast(`${product.name} agregado al carrito`, "success")
  }

  const removeFromCart = (productId) => {
    const item = state.items.find((item) => item.id === productId)
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
    if (item) showToast(`${item.name} eliminado del carrito`, "info")
  }

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
    showToast("Carrito vaciado", "info")
  }

  const toggleCart = () => dispatch({ type: "TOGGLE_CART" })

  const getTotalItems = () => state.items.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () =>
    state.items.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("$", "").replace(".", "").replace(",", "."))
      return total + price * item.quantity
    }, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
