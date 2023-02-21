const Sequelize = require("sequelize")
const conn = require("../database/database")

var productImage = conn.db.define('product_image',{
    image: Sequelize.STRING,
    isPrimary: Sequelize.BOOLEAN,
    productId: Sequelize.INTEGER,
})

module.exports = productImage