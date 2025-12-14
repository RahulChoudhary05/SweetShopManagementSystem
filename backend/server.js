const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/database")
const { errorHandler } = require("./utils/errorHandler")
const { PORT, NODE_ENV } = require("./config/env")
const logger = require("./utils/logger")

// Route files
const authRoutes = require("./routes/auth")
const sweetRoutes = require("./routes/sweets")
const inventoryRoutes = require("./routes/inventory")

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enable CORS
app.use(
  cors({
    origin: "https://sweetshopmanagementsystem.vercel.app/",
    credentials: true,
  }),
)

// Dev logging middleware
if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Mount routers
app.use("/api/auth", authRoutes)
app.use("/api/sweets", sweetRoutes)
app.use("/api/sweets", inventoryRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sweet Shop API is running",
  })
})

// Error handler
app.use(errorHandler)

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${NODE_ENV} mode on port ${PORT}`)
  console.log(`App is running at ${PORT}`);
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  logger.error(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});
module.exports = app
