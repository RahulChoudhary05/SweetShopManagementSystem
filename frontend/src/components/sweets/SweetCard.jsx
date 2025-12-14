"use client"

import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ShoppingCart, Trash2 } from "lucide-react"
import { formatPrice } from "../../utils/helpers"

export const SweetCard = ({ sweet }) => {
  const navigate = useNavigate()
  const { addToCart, removeFromCart, isInCart } = useCart()

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart({ ...sweet, qty: 1 })
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    removeFromCart(sweet._id)
  }

  return (
    <Card
      onClick={() => navigate(`/sweets/${sweet._id}`)}
      className="cursor-pointer group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border-2 border-border hover:border-primary/40"
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-square bg-muted">
        <img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <Badge className="absolute top-3 right-3 bg-background/90">
          {sweet.category}
        </Badge>
      </div>

      {/* CONTENT */}
      <CardHeader>
        <CardTitle className="text-lg line-clamp-1">
          {sweet.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {sweet.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="font-bold text-primary">
          {formatPrice(sweet.price)}
        </span>
      </CardContent>

      {/* CART ACTIONS */}
      <CardFooter>
        {isInCart(sweet._id) ? (
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleRemove}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={handleAdd}
            disabled={sweet.quantity === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
