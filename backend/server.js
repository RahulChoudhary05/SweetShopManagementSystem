const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/database")
const { errorHandler } = require("./utils/errorHandler")
const { PORT, NODE_ENV } = require("./config/env")

const authRoutes = require("./routes/auth")
const sweetRoutes = require("./routes/sweets")
const inventoryRoutes = require("./routes/inventory")

connectDB()

const app = express()

/* ===========================
   BODY PARSER
=========================== */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ===========================
   🔥 ABSOLUTE CORS FIX
=========================== */
const allowedOrigins = [
  "https://sweetshopmanagementsystem.vercel.app"
]

app.use((req, res, next) => {
  const origin = req.headers.origin

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }

  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  )

  // 🔥 HANDLE PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }

  next()
})

/* ===========================
   DEV LOGGING
=========================== */
if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

/* ===========================
   ROUTES
=========================== */
app.use("/api/auth", authRoutes)
app.use("/api/sweets", sweetRoutes)
app.use("/api/sweets", inventoryRoutes)

/* ===========================
   HEALTH
=========================== */
app.get("/api/health", (req, res) => {
  res.json({ success: true })
})

/* ===========================
   ERROR HANDLER
=========================== */
app.use(errorHandler)

/* ===========================
   SERVER
=========================== */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app
