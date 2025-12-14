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
    ingredients: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        ingredients: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join(", ")
          : "",
      })
    }
  }, [initialData])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

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
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Sweet Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ CATEGORY (NOW WORKS PERFECTLY) */}
        <div>
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(v) => setForm({ ...form, category: v })}
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

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <Input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <Input
          name="weight"
          placeholder="Weight"
          value={form.weight}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label>Ingredients</Label>
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
