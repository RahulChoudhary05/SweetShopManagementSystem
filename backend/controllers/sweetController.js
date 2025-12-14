const Sweet = require("../models/Sweet")
const { ErrorResponse } = require("../utils/errorHandler")
const logger = require("../utils/logger")

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
exports.getSweets = async (req, res, next) => {
  try {
    const sweets = await Sweet.find({ isAvailable: true }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single sweet
// @route   GET /api/sweets/:id
// @access  Public
exports.getSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return next(new ErrorResponse("Sweet not found", 404))
    }

    res.status(200).json({
      success: true,
      data: sweet,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Search sweets
// @route   GET /api/sweets/search
// @access  Public
exports.searchSweets = async (req, res, next) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query

    const query = { isAvailable: true }

    if (name) {
      query.$text = { $search: name }
    }

    if (category) {
      query.category = category
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create new sweet
// @route   POST /api/sweets
// @access  Private (Admin)
exports.createSweet = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.id

    const sweet = await Sweet.create(req.body)

    logger.info(`New sweet created: ${sweet.name} by ${req.user.email}`)

    res.status(201).json({
      success: true,
      data: sweet,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update sweet
// @route   PUT /api/sweets/:id
// @access  Private (Admin)
exports.updateSweet = async (req, res, next) => {
  try {
    let sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return next(new ErrorResponse("Sweet not found", 404))
    }

    sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    logger.info(`Sweet updated: ${sweet.name} by ${req.user.email}`)

    res.status(200).json({
      success: true,
      data: sweet,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete sweet
// @route   DELETE /api/sweets/:id
// @access  Private (Admin)
exports.deleteSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return next(new ErrorResponse("Sweet not found", 404))
    }

    await sweet.deleteOne()

    logger.info(`Sweet deleted: ${sweet.name} by ${req.user.email}`)

    res.status(200).json({
      success: true,
      data: {},
    })
  } catch (error) {
    next(error)
  }
}
