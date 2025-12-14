const express = require("express")
const { purchaseSweet, restockSweet } = require("../controllers/inventoryController")
const { protect } = require("../middlewares/auth")
const { authorize } = require("../middlewares/admin")

const router = express.Router()

router.post("/:id/purchase", protect, purchaseSweet)
router.post("/:id/restock", protect, authorize("admin"), restockSweet)

module.exports = router
