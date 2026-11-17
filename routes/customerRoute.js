const { createCustomer, getAllCustomers, getOneCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController")

const router = require("express").Router()

router.post("/customer", createCustomer)
router.get("/customer", getAllCustomers)
router.get("/customer/:customerId", getOneCustomer)
router.patch("/customer/:customerId", updateCustomer)
router.delete("/customer/:customerId", deleteCustomer)

module.exports = router
