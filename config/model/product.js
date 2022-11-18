const Sequelize = require("sequelize")
const productImage = require("./product_image")
const db = require("../database/database")

var product = db.define('product',{
    name: Sequelize.STRING,
    variant: Sequelize.STRING,
    description: Sequelize.STRING,
    productCategoryId: Sequelize.INTEGER,
},{
    paranoid: true
})

product.hasMany(productImage)

module.exports = product