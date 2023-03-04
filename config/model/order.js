const Sequelize = require("sequelize")
const conn = require("../database/database")
const product = require("./product")
const reseller = require("./reseller")

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

order.belongsTo(product)
order.belongsTo(reseller)

module.exports = order