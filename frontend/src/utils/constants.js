export const CATEGORIES = [
  "All",
  "Chocolate",
  "Donut",
  "Gummy",
  "Lollipop",
  "Caramel",
  "Marshmallow",
  "Fudge",
  "Taffy",
  "Hard Donut",
  "Other",
]

export const PRICE_RANGES = [
  { label: "All Prices", min: null, max: null },
  { label: "Under $5", min: 0, max: 5 },
  { label: "$5 - $10", min: 5, max: 10 },
  { label: "$10 - $15", min: 10, max: 15 },
  { label: "Over $15", min: 15, max: null },
]

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  SWEETS: "/sweets",
  ADMIN: "/admin",
}
