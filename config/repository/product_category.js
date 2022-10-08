const { Op } = require("sequelize")
const model = require("../model/index")
const repository = {}

repository.createProductCategory = async function (req, callback) {
    try {
        const { category } = req.body
        await model.productCategory.create({
            category
        })
        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.updateProductCategory = async function (req, callback) {
    try {
        const { id, category } = req.body
        await model.productCategory.update({
            category
        },{
            where: {id}
        })

        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.deleteProductCategory = async function (req, callback) {
    try {
        const { id } = req.params
        await model.productCategory.destroy({
            where: {id}
        })

        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.getAllProductCategory = async function (req, callback) {
    try {
        const { count, rows } = await model.productCategory.findAndCountAll({
            offset: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            where:{
                category:{[Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        
        return callback(null, {total: count, data: rows})
    } catch (error) {
        return callback(error)
    }
}

repository.getProductCategoryById = async function (id, callback) {
    try {
        const data = await model.user.findByPk(id)
        return callback(null, data)
    } catch (error) {
        return callback(error)
    }
}

module.exports = repository