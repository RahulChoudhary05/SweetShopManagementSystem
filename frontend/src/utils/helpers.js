export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const getStockStatus = (quantity) => {
  if (quantity === 0) return "Out of Stock"
  if (quantity < 20) return "Low Stock"
  return "In Stock"
}

export const getStockStatusColor = (quantity) => {
  if (quantity === 0) return "text-destructive"
  if (quantity < 20) return "text-amber-600"
  return "text-emerald-600"
}
