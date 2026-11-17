const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    productName: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    stockQuantity: {type: Number, required: true}
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel
