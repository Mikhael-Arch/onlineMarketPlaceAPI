const productModel = require("../models/productModel")

exports.createProduct = async (req, res) => {
    try {
        const productData = {
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stockQuantity: req.body.stockQuantity
        }

        const checkProduct = await productModel.findOne({productName: req.body.productName})
        if (checkProduct) {
            return res.status(400).json({
                message: `Product with the name ${req.body.productName} already exists`
            })
        }

        const data = await productModel.create(productData)
        res.status(201).json({
            message: "Product successfully created",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const data = await productModel.find()
        res.status(200).json({
            message: "Products successfully retrieved",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.getOneProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const findProduct = await productModel.findById(id)
        if (!findProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product successfully retrieved",
            data: findProduct
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const data = await productModel.findByIdAndUpdate(id, req.body, { returnDocument: "after", runValidators: true })
        if (!data) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product successfully updated",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const findProduct = await productModel.findById(id)
        if (!findProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        await productModel.findByIdAndDelete(id)
        res.status(200).json({
            message: "Product successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            realError: error.message
        })
    }
}
