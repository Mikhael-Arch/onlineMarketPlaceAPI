const orderModel = require("../models/orderModel")
const customerModel = require("../models/customerModel")
const productModel = require("../models/productModel")

exports.placeOrder = async (req, res) => {
    try {
        const id = req.params.customerId
        const findCustomer = await customerModel.findById(id)
        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            })
        }

        const products = req.body.products
        if (!products || products.length === 0) {
            return res.status(400).json({
                message: "Please add at least one product to the order"
            })
        }

        let totalAmount = 0
        const foundProducts = []

        for (const productId of products) {
            // if this product is already in the order, use the same one so the stock is counted correctly
            let findProduct = foundProducts.find((product) => product._id.toString() === productId)

            if (!findProduct) {
                findProduct = await productModel.findById(productId)
                if (!findProduct) {
                    return res.status(404).json({
                        message: `Product with the id ${productId} not found`
                    })
                }
                foundProducts.push(findProduct)
            }

            if (findProduct.stockQuantity < 1) {
                return res.status(400).json({
                    message: `${findProduct.productName} is out of stock`
                })
            }

            totalAmount = totalAmount + findProduct.price
            findProduct.stockQuantity = findProduct.stockQuantity - 1 // not saved yet
        }

        const orderData = {
            customer: id,
            products: products,
            totalAmount: totalAmount
        }
        const data = await orderModel.create(orderData)

        for (const product of foundProducts) {
            await product.save()
        }

        findCustomer.order.push(data._id)
        await findCustomer.save()

        res.status(201).json({
            message: "Order successfully placed",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const data = await orderModel.find().populate("customer").populate("products")
        res.status(200).json({
            message: "Orders successfully retrieved",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getOneOrder = async (req, res) => {
    try {
        const id = req.params.orderId
        const findOrder = await orderModel.findById(id).populate("customer").populate("products")
        if (!findOrder) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        res.status(200).json({
            message: "Order successfully retrieved",
            data: findOrder
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.orderId
        const status = req.body.status
        const allowedStatus = ["Pending", "Processing", "Shipped", "Delivered"]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Status must be Pending, Processing, Shipped or Delivered"
            })
        }

        const findOrder = await orderModel.findById(id)
        if (!findOrder) {
            return res.status(404).json({
                message: "Order not found"
            })
        }

        findOrder.status = status
        await findOrder.save()
        res.status(200).json({
            message: "Order status successfully updated",
            data: findOrder
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}
