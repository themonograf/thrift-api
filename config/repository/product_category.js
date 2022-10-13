const { Op } = require("sequelize")
const model = require("../model/index")
const repository = {}

repository.createProductCategory = async function (req, callback) {
    try {
        const { category, image } = req.body
        await model.productCategory.create({
            category,
            image
        })
        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.updateProductCategory = async function (req, callback) {
    try {
        const { id, category, image } = req.body
        await model.productCategory.update({
            category,
            image
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
            where:{
                category:{[Op.like]: '%' + req.query.keyword + '%'}
            },
            offset: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            order: [['updatedAt','DESC']],
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

repository.getAllProductCategoryCatalog = async function (req, callback) {
    try {
        const data = await model.productCategory.findAll({
            where:{
                category:{[Op.like]: '%' + req.query.keyword + '%'}
            },
            order: [['category','ASC']],
        })
        
        return callback(null, data)
    } catch (error) {
        return callback(error)
    }
}

module.exports = repository