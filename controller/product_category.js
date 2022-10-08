const { validationResult } = require("express-validator")
const repository = require("../config/repository/index")

const controller = {}

controller.createProductCategory = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.createProductCategory(req, (err) => {
        if(err){
            return res.status(404).json({
                success: false,
                message: err
            })
        }
        return res.json({
            success: true,
            data: []
        })
    })
}

controller.updateProductCategory = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.updateProductCategory(req, (err) => {
        if(err){
            return res.status(404).json({
                success: false,
                message: err
            })
        }
        return res.json({
            success: true,
            data: []
        })
    })
}

controller.deleteProductCategory = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.deleteProductCategory(req, (err) => {
        if(err){
            return res.status(404).json({
                success: false,
                message: err
            })
        }
        return res.json({
            success: true,
            data: []
        })
    })
}

controller.getAllProductCategory = async function (req, res) {
    req.query.keyword = req.query.keyword || ""
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.getAllProductCategory(req, (err, result) => {
        if(err){
            return res.status(404).json({
                success: false,
                message: err
            })
        }
        return res.json({
            success: true,
            data: result
        })
    })
}

module.exports = controller