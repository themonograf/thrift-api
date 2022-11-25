const Sequelize = require("sequelize")
const db = require("../database/database")

var reseller = db.define('resellers',{
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    tokopedia: Sequelize.STRING,
    shopee: Sequelize.STRING,
    instagram: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
},{
    paranoid: true
})

module.exports = reseller