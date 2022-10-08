const { validationResult } = require("express-validator")
const repository = require("../config/repository/index")

const controller = {}

controller.createProductCategroy = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.createProductCategroy(req, (err) => {
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

controller.updateProductCategroy = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.updateProductCategroy(req, (err) => {
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

controller.deleteProductCategroy = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.deleteProductCategroy(req, (err) => {
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

controller.getAllProductCategroy = async function (req, res) {
    req.query.keyword = req.query.keyword || ""
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(404).json({
            success: false,
            message: errors.array()[0].msg
        })
    }

    repository.productCategory.getAllProductCategroy(req, (err, result) => {
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