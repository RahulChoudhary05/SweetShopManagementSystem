"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { CATEGORIES } from "../../utils/constants"

export const SweetForm = ({ onSubmit, initialData, loading }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    weight: "100g",
    image: "",
    ingredients: "",
  })

  // ✅ Prefill data while editing
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        category: initialData.category || "",
        price: initialData.price ?? "",
        quantity: initialData.quantity ?? "",
        weight: initialData.weight || "100g",
        image: initialData.image || "",
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join(", ")
          : "",
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const submit = (e) => {
    e.preventDefault()

    onSubmit({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      ingredients: form.ingredients
        ? form.ingredients.split(",").map((i) => i.trim())
        : [],
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Name + Category */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Sweet Name *</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Category *</Label>
          <Select
            value={form.category}
            onValueChange={(v) =>
              setForm((prev) => ({ ...prev, category: v }))
            }
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border shadow-lg">
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label>Description *</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* Price / Quantity / Weight */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <Label>Price *</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Quantity *</Label>
          <Input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label>Weight</Label>
          <Input
            name="weight"
            value={form.weight}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <Label>Image URL *</Label>
        <Input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://example.com/sweet.jpg"
          required
        />

        {/* Preview */}
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-3 h-32 w-full object-cover rounded-lg border"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </div>

      {/* Ingredients */}
      <div>
        <Label>Ingredients (comma-separated)</Label>
        <Input
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Sweet" : "Create Sweet"}
      </Button>
    </form>
  )
}
