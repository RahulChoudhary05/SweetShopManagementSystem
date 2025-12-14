const Sweet = require("../models/Sweet")
const { ErrorResponse } = require("../utils/errorHandler")
const logger = require("../utils/logger")

// @desc    Purchase sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
exports.purchaseSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body

    if (!quantity || quantity <= 0) {
      return next(new ErrorResponse("Please provide a valid quantity", 400))
    }

    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return next(new ErrorResponse("Sweet not found", 404))
    }

    if (sweet.quantity < quantity) {
      return next(new ErrorResponse(`Not enough stock. Available: ${sweet.quantity}`, 400))
    }

    sweet.quantity -= quantity

    if (sweet.quantity === 0) {
      sweet.isAvailable = false
    }

    await sweet.save()

    logger.info(`Purchase: ${quantity}x ${sweet.name} by ${req.user.email}`)

    res.status(200).json({
      success: true,
      message: `Successfully purchased ${quantity} ${sweet.name}`,
      data: sweet,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Restock sweet
// @route   POST /api/sweets/:id/restock
// @access  Private (Admin)
exports.restockSweet = async (req, res, next) => {
  try {
    const { quantity } = req.body

    if (!quantity || quantity <= 0) {
      return next(new ErrorResponse("Please provide a valid quantity", 400))
    }

    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return next(new ErrorResponse("Sweet not found", 404))
    }

    sweet.quantity += quantity
    sweet.isAvailable = true

    await sweet.save()

    logger.info(`Restock: ${quantity}x ${sweet.name} by ${req.user.email}`)

    res.status(200).json({
      success: true,
      message: `Successfully restocked ${quantity} ${sweet.name}`,
      data: sweet,
    })
  } catch (error) {
    next(error)
  }
}
