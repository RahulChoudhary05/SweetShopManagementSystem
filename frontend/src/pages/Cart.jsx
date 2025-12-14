"use client"

import { useCart } from "../context/CartContext"
import { Button } from "../components/ui/button"
import { Trash2 } from "lucide-react"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"

export const Cart = () => {
  const { cart, removeFromCart } = useCart()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>₹ {item.price}</p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => removeFromCart(item._id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
