"use client"

import { useParams } from "react-router-dom"
import { useSweets } from "../hooks/useSweets"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"
import { Button } from "../components/ui/button"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useState } from "react"

export const SweetDetail = () => {
  const { id } = useParams()
  const { sweets, loading } = useSweets()
  const { addToCart, removeFromCart, cart } = useCart()
  const [qty, setQty] = useState(1)

  const sweet = sweets.find((s) => s._id === id)

  if (loading || !sweet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  const inCart = cart.some((item) => item._id === sweet._id)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden bg-muted">
            <img
              src={sweet.image}
              alt={sweet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{sweet.name}</h1>

            <p className="text-2xl font-bold text-primary">
              ₹ {sweet.price}
            </p>

            <p className="text-muted-foreground">
              {sweet.description}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-2 border rounded"
              >
                <Minus />
              </button>

              <span className="text-lg font-bold">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2 border rounded"
              >
                <Plus />
              </button>
            </div>

            {/* CART ACTION */}
            {!inCart ? (
              <Button
                size="lg"
                className="w-full"
                disabled={sweet.quantity === 0}
                onClick={() => addToCart({ ...sweet, qty })}
              >
                <ShoppingCart className="mr-2" />
                Add to Cart
              </Button>
            ) : (
              <Button
                size="lg"
                variant="destructive"
                className="w-full"
                onClick={() => removeFromCart(sweet._id)}
              >
                <Trash2 className="mr-2" />
                Remove from Cart
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
