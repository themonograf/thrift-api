const Sequelize = require("sequelize")
const conn = require("../database/database")

var reseller = conn.db.define('resellers',{
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    tokopedia: Sequelize.STRING,
    shopee: Sequelize.STRING,
    instagram: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    isAdmin: Sequelize.BOOLEAN,
},{
    paranoid: true
})

module.exports = reseller