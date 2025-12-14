"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id))
  }

  const isInCart = (id) => {
    return cart.some((item) => item._id === id)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ✅ THIS WAS MISSING */
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }
  return context
}
