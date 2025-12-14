const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_EXPIRE } = require("../config/env")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  })
}

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
