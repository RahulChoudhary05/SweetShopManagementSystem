const express = require("express")
const {
  getSweets,
  getSweet,
  searchSweets,
  createSweet,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweetController")
const { protect } = require("../middlewares/auth")
const { authorize } = require("../middlewares/admin")
const { validateSweet } = require("../middlewares/validation")

const router = express.Router()

router.get("/", getSweets)
router.get("/search", searchSweets)
router.get("/:id", getSweet)
router.post("/", protect, authorize("admin"), validateSweet, createSweet)
router.put("/:id", protect, authorize("admin"), updateSweet)
router.delete("/:id", protect, authorize("admin"), deleteSweet)

module.exports = router
