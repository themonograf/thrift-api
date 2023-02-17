const Sequelize = require("sequelize")
const db = require("../database/database")

var order = db.define('order',{
    productId: Sequelize.INTEGER,
    typeSale: Sequelize.TINYINT,
    resellerId: Sequelize.INTEGER,
    customerName: Sequelize.STRING,
    customerPhonenumber: Sequelize.STRING,
    customerAddress: Sequelize.STRING,
    sell_price: Sequelize.FLOAT,
})

module.exports = order