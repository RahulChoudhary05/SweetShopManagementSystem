const mongoose = require("mongoose")

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a sweet name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: [
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
      ],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    image: {
      type: String,
      default: "/delicious-colorful-sweets.jpg",
    },
    ingredients: {
      type: [String],
      default: [],
    },
    weight: {
      type: String,
      default: "100g",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

// Index for search functionality
sweetSchema.index({ name: "text", description: "text", category: "text" })

module.exports = mongoose.model("Sweet", sweetSchema)
