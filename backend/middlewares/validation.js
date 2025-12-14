const { ErrorResponse } = require("../utils/errorHandler")

exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return next(new ErrorResponse("Please provide all required fields", 400))
  }

  if (password.length < 6) {
    return next(new ErrorResponse("Password must be at least 6 characters", 400))
  }

  next()
}

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400))
  }

  next()
}

exports.validateSweet = (req, res, next) => {
  const { name, description, category, price, quantity } = req.body

  if (!name || !description || !category || price === undefined || quantity === undefined) {
    return next(new ErrorResponse("Please provide all required fields", 400))
  }

  if (price < 0 || quantity < 0) {
    return next(new ErrorResponse("Price and quantity must be positive numbers", 400))
  }

  next()
}
