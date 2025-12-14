require("dotenv").config()

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://rahulchoudharysk:rahulsk2005@cluster0.pd1mt3y.mongodb.net/SweetShopManagementSystem",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "30d",
  NODE_ENV: process.env.NODE_ENV || "development",
}
