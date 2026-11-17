const customerModel = require("../models/customerModel")

exports.createCustomer = async (req, res) => {
    try {
        const customerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }

        const checkCustomer = await customerModel.findOne({email: req.body.email})
        if (checkCustomer) {
            return res.status(400).json({
                message: `Customer with the email ${req.body.email} already exists`
            })
        }

        const checkPhone = await customerModel.findOne({phoneNumber: req.body.phoneNumber})
        if (checkPhone) {
            return res.status(400).json({
                message: `Customer with the phone number ${req.body.phoneNumber} already exists`
            })
        }

        const data = await customerModel.create(customerData)
        data.password = undefined // hide the password in the response
        res.status(201).json({
            message: "Customer successfully created",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getAllCustomers = async (req, res) => {
    try {
        const data = await customerModel.find()
        res.status(200).json({
            message: "Customers successfully retrieved",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getOneCustomer = async (req, res) => {
    try {
        const id = req.params.customerId
        const findCustomer = await customerModel.findById(id).populate("order")
        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            })
        }

        res.status(200).json({
            message: "Customer successfully retrieved",
            data: findCustomer
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.updateCustomer = async (req, res) => {
    try {
        const id = req.params.customerId
        const data = await customerModel.findByIdAndUpdate(id, req.body, { returnDocument: "after", runValidators: true })
        if (!data) {
            return res.status(404).json({
                message: "Customer not found"
            })
        }

        res.status(200).json({
            message: "Customer successfully updated",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const id = req.params.customerId
        const findCustomer = await customerModel.findById(id)
        if (!findCustomer) {
            return res.status(404).json({
                message: "Customer not found"
            })
        }

        await customerModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Customer successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}
