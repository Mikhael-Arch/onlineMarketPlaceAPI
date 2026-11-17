const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    customer: {type: mongoose.Schema.Types.ObjectId, ref: "customer"},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "product"}],
    totalAmount: {type: Number, default: 0},
    status: {type: String, enum: ["Pending", "Processing", "Shipped", "Delivered"], default: "Pending"},
    orderDate: {type: Date, default: Date.now}
})

const orderModel = mongoose.model("Order", orderSchema)

module.exports = orderModel
