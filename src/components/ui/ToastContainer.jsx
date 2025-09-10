"use client"

import { useToast } from "../../contexts/ToastContext"
import Toast from "./Toast"

export default function ToastContainer() {
  const { toasts, hideToast } = useToast()

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  )
}
