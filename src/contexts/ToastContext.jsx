"use client"
import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = "success") => {
    const id = Date.now()
    const newToast = { id, message, type, isVisible: true }
    setToasts((prev) => [...prev, newToast])
    setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 3000)
  }

  const hideToast = (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))

  return <ToastContext.Provider value={{ toasts, showToast, hideToast }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}
