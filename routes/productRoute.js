const { createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const router = require("express").Router()

router.post("/product", createProduct)
router.get("/product", getAllProducts)
router.get("/product/:productId", getOneProduct)
router.patch("/product/:productId", updateProduct)
router.delete("/product/:productId", deleteProduct)

module.exports = router
