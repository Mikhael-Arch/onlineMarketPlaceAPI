const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    phoneNumber: {type: String, required: true, unique: true},
    address: {type: String, required: true},
    order: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"}]
})

const customerModel = mongoose.model("customer", customerSchema)

module.exports = customerModel
