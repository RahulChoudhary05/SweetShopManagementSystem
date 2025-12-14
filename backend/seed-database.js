// Database seeding script for Sweet Shop Management System
const mongoose = require("mongoose")
require("dotenv").config({ path: "../backend/.env" })

// Import models
const User = require("../backend/models/User")
const Sweet = require("../backend/models/Sweet")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://rahulchoudharysk:rahulsk2005@cluster0.pd1mt3y.mongodb.net/SweetShopManagementSystem"

// Sample sweets data
const sweetsData = [
  {
    name: "Dark Chocolate Truffles",
    description: "Rich, velvety dark chocolate truffles with a smooth ganache center. Handcrafted with premium cocoa.",
    category: "Chocolate",
    price: 12.99,
    quantity: 50,
    weight: "200g",
    ingredients: ["Dark Chocolate", "Cream", "Cocoa Powder", "Sugar"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Rainbow Gummy Bears",
    description: "Colorful, fruity gummy bears in assorted flavors. Perfect for all ages and occasions.",
    category: "Gummy",
    price: 5.99,
    quantity: 100,
    weight: "150g",
    ingredients: ["Glucose Syrup", "Sugar", "Gelatin", "Natural Flavors", "Colors"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Strawberry Lollipops",
    description: "Classic strawberry-flavored lollipops with a sweet and tangy taste. Great for parties!",
    category: "Lollipop",
    price: 3.99,
    quantity: 75,
    weight: "50g",
    ingredients: ["Sugar", "Corn Syrup", "Strawberry Flavor", "Citric Acid", "Colors"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Salted Caramel Chews",
    description: "Soft, buttery caramel chews with a hint of sea salt. Irresistibly delicious!",
    category: "Caramel",
    price: 8.99,
    quantity: 60,
    weight: "180g",
    ingredients: ["Sugar", "Butter", "Cream", "Sea Salt", "Vanilla Extract"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Vanilla Marshmallows",
    description: "Fluffy, cloud-like vanilla marshmallows. Perfect for hot chocolate or snacking.",
    category: "Marshmallow",
    price: 6.99,
    quantity: 80,
    weight: "120g",
    ingredients: ["Sugar", "Gelatin", "Vanilla Extract", "Corn Syrup"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Chocolate Fudge Squares",
    description: "Decadent chocolate fudge squares with a creamy texture. Made with real chocolate.",
    category: "Fudge",
    price: 10.99,
    quantity: 40,
    weight: "250g",
    ingredients: ["Chocolate", "Condensed Milk", "Butter", "Sugar", "Vanilla"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Fruit Taffy Mix",
    description: "Chewy fruit-flavored taffy in various colors and flavors. A nostalgic treat!",
    category: "Taffy",
    price: 7.99,
    quantity: 55,
    weight: "160g",
    ingredients: ["Sugar", "Corn Syrup", "Natural Flavors", "Colors", "Salt"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Peppermint Hard Donut",
    description: "Refreshing peppermint hard candies with a cool, minty flavor. Sugar-free option available.",
    category: "Hard Donut",
    price: 4.99,
    quantity: 90,
    weight: "100g",
    ingredients: ["Sugar", "Peppermint Oil", "Corn Syrup"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Milk Chocolate Bars",
    description: "Smooth, creamy milk chocolate bars. A timeless classic that everyone loves.",
    category: "Chocolate",
    price: 4.49,
    quantity: 120,
    weight: "100g",
    ingredients: ["Milk Chocolate", "Sugar", "Cocoa Butter", "Milk Powder"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Sour Gummy Worms",
    description: "Tangy, sour gummy worms with a sweet finish. A favorite among sour Donut lovers!",
    category: "Gummy",
    price: 6.49,
    quantity: 85,
    weight: "170g",
    ingredients: ["Glucose Syrup", "Sugar", "Gelatin", "Citric Acid", "Natural Flavors"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Butterscotch Discs",
    description: "Traditional butterscotch hard candies with a rich, buttery flavor. Made with real butter.",
    category: "Hard Donut",
    price: 5.49,
    quantity: 70,
    weight: "140g",
    ingredients: ["Sugar", "Butter", "Cream", "Brown Sugar", "Salt"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
  {
    name: "Cotton Donut Clouds",
    description: "Light, fluffy cotton Donut in pink and blue swirls. Melts in your mouth!",
    category: "Other",
    price: 3.49,
    quantity: 45,
    weight: "50g",
    ingredients: ["Sugar", "Food Coloring", "Natural Flavors"],
    image: "/delicious-colorful-sweets.jpg",
    isAvailable: true,
  },
]

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB successfully!")

    // Clear existing data
    console.log("Clearing existing data...")
    await User.deleteMany({})
    await Sweet.deleteMany({})
    console.log("Existing data cleared!")

    // Create admin user
    console.log("Creating admin user...")
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@sweetshop.com",
      password: "admin123",
      role: "admin",
    })
    console.log("Admin user created:", adminUser.email)

    // Create regular user
    console.log("Creating regular user...")
    const regularUser = await User.create({
      name: "John Doe",
      email: "user@sweetshop.com",
      password: "user123",
      role: "user",
    })
    console.log("Regular user created:", regularUser.email)

    // Create sweets
    console.log("Creating sweets...")
    const sweets = await Sweet.insertMany(
      sweetsData.map((sweet) => ({
        ...sweet,
        createdBy: adminUser._id,
      })),
    )
    console.log(`${sweets.length} sweets created successfully!`)

    console.log("\n=== Seeding completed successfully! ===")
    console.log("\nTest Accounts:")
    console.log("Admin: admin@sweetshop.com / admin123")
    console.log("User: user@sweetshop.com / user123")
    console.log(`\nTotal Sweets: ${sweets.length}`)

    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()
