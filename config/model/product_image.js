const Sequelize = require("sequelize")
const conn = require("../database/database")

var productImage = conn.db.define('product_image',{
    image: Sequelize.STRING,
    isPrimary: Sequelize.BOOLEAN,
    productId: Sequelize.INTEGER,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
})

module.exports = productImage