const Sequelize = require("sequelize")
const conn = require("../database/database")

var order = conn.db.define('order',{
    productId: Sequelize.INTEGER,
    typeSale: Sequelize.TINYINT,
    resellerId: Sequelize.INTEGER,
    customerName: Sequelize.STRING,
    customerPhonenumber: Sequelize.STRING,
    customerAddress: Sequelize.STRING,
    basicPrice: Sequelize.FLOAT,
    sellPrice: Sequelize.FLOAT,
    resellerCommision: Sequelize.FLOAT,
    status: Sequelize.TINYINT,
})

module.exports = order