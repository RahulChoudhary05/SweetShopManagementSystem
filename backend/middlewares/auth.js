const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { ErrorResponse } = require("../utils/errorHandler")
const { JWT_SECRET } = require("../config/env")

// Protect routes
exports.protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401))
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return next(new ErrorResponse("User no longer exists", 401))
    }

    next()
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401))
  }
}
