const Sequelize = require("sequelize")
const db = require("../database/database")

var productPrice = db.define('product_price',{
    productId: Sequelize.INTEGER,
    resellerId: Sequelize.INTEGER,
    price: Sequelize.FLOAT,
})

module.exports = productPrice