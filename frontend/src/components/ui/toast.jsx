"use client"

import React, { useState, useCallback } from "react"
import { X } from "lucide-react"

const ToastContext = React.createContext(null)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ title, description, variant = "default", duration = 3000 }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, title, description, variant }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const Toast = ({ id, title, description, variant, onClose }) => {
  const variants = {
    default: "bg-card border-border",
    success: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900",
    error: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-900",
    warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-900",
  }

  return (
    <div
      className={`border rounded-lg p-4 shadow-lg animate-in slide-in-from-right-full duration-300 ${variants[variant]}`}
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">{title}</p>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
