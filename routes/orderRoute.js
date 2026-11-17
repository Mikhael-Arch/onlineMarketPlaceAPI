const { placeOrder, getAllOrders, getOneOrder, updateOrderStatus } = require("../controllers/orderController")

const router = require("express").Router()

router.post("/order/:customerId", placeOrder)
router.get("/order", getAllOrders)
router.get("/order/:orderId", getOneOrder)
router.patch("/order/:orderId/status", updateOrderStatus)

module.exports = router
