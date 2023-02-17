const Sequelize = require("sequelize")
const db = require("../database/database")

var productItem = db.define('product_item',{
    productId: Sequelize.INTEGER,
    resellerId: Sequelize.INTEGER,
    price: Sequelize.FLOAT,
    description: Sequelize.STRING,
    enable: Sequelize.BOOLEAN,
    tokopedia: Sequelize.STRING,
    shopee: Sequelize.STRING,
    link: Sequelize.STRING,
})

module.exports = productItem