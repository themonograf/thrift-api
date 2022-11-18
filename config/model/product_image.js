const Sequelize = require("sequelize")
const db = require("../database/database")

var productImage = db.define('product_image',{
    image: Sequelize.STRING,
    isPrimary: Sequelize.BOOLEAN,
    productId: Sequelize.INTEGER,
})

module.exports = productImage