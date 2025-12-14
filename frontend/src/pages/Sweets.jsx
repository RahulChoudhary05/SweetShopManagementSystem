"use client"

import { useState, useMemo } from "react"
import { Header } from "../components/common/Header"
import { Footer } from "../components/common/Footer"
import { useSweets } from "../hooks/useSweets"
import { SweetList } from "../components/sweets/SweetList"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, Filter, X, ChevronDown } from "lucide-react"

export const Sweets = () => {
  const { sweets, loading } = useSweets()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })
  const [selectedRating, setSelectedRating] = useState("All")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(true)

  const categories = [
    "All",
    "Chocolate",
    "Gummy",
    "Hard Donut",
    "Lollipop",
    "Caramel",
    "Marshmallow",
    "Fudge",
    "Taffy",
    "Other",
  ]

  const ratingOptions = ["All", "4", "3", "2"]

  /* add mock rating ONLY for UI (backend not affected) */
  const sweetsWithRatings = useMemo(() => {
    return sweets.map((sweet) => ({
      ...sweet,
      rating: sweet.rating || Math.floor(Math.random() * 3) + 3,
    }))
  }, [sweets])

  const filteredSweets = useMemo(() => {
    let result = [...sweetsWithRatings]

    // Search
    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter((s) => s.category === selectedCategory)
    }

    // Price
    result = result.filter(
      (s) => s.price >= priceRange.min && s.price <= priceRange.max
    )

    // Rating
    if (selectedRating !== "All") {
      result = result.filter((s) => s.rating >= Number(selectedRating))
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [
    sweetsWithRatings,
    searchTerm,
    selectedCategory,
    priceRange,
    selectedRating,
    sortBy,
  ])

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "All" ||
    priceRange.min > 0 ||
    priceRange.max < 100 ||
    selectedRating !== "All"

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setPriceRange({ min: 0, max: 100 })
    setSelectedRating("All")
    setSortBy("popular")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Browse Our Sweets
          </h1>
          <p className="text-muted-foreground">
            Discover our delicious collection of premium confectionery
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTERS */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="space-y-5">

              {/* Search */}
              <div>
                <label className="font-semibold">Search</label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search sweets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="font-semibold">Category</label>
                <div className="space-y-2 mt-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="font-semibold">Price Range</label>
                <div className="mt-2 space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((p) => ({
                        ...p,
                        min: Number(e.target.value),
                      }))
                    }
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((p) => ({
                        ...p,
                        max: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="font-semibold">Rating</label>
                <div className="space-y-2 mt-2">
                  {ratingOptions.map((r) => (
                    <label key={r} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        checked={selectedRating === r}
                        onChange={() => setSelectedRating(r)}
                      />
                      <span>{r === "All" ? "All" : `${r}★ & above`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <Button variant="secondary" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* PRODUCTS */}
          <section className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <p className="text-sm">
                Showing {filteredSweets.length} of {sweets.length} products
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 pr-10 border rounded-lg"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              </div>
            </div>

            <SweetList sweets={filteredSweets} loading={loading} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
