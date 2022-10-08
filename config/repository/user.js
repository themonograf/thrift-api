const { Op } = require("sequelize")
const model = require("../model/index")
const repository = {}

repository.createUser = async function (req, callback) {
    try {
        const { name, username, password } = req.body
        await model.user.create({
            name,
            username,
            password,
        })
        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.updateUser = async function (req, callback) {
    try {
        const { id, name, username } = req.body
        await model.user.update({
            name,
            username,
        },{
            where: {id}
        })

        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.deleteUser = async function (req, callback) {
    try {
        const { id } = req.params
        await model.user.destroy({
            where: {id}
        })

        return callback(null)
    } catch (error) {
        return callback(error)
    }
}

repository.getAllUser = async function (req, callback) {
    try {
        const { count, rows } = await model.user.findAndCountAll({
            offset: parseInt(req.query.page),
            limit: parseInt(req.query.limit),
            where:{
                [Op.or]:[
                    {name:{[Op.like]: '%' + req.query.keyword + '%'}},
                    {username:{[Op.like]: '%' + req.query.keyword + '%'}}
                ]
            }
        })
        
        return callback(null, {total: count, data: rows})
    } catch (error) {
        return callback(error)
    }
}

repository.getUserByUsername = async function (username, callback) {
    try {
        const data = await model.user.findOne({
            where: {username: username}
        })
        return callback(null, data)
    } catch (error) {
        return callback(error)
    }
}

module.exports = repository
