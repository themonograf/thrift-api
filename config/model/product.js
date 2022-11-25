const Sequelize = require("sequelize")
const productImage = require("./product_image")
const productPrice = require("./product_price")
const db = require("../database/database")

var product = db.define('product',{
    name: Sequelize.STRING,
    variant: Sequelize.STRING,
    description: Sequelize.STRING,
    productCategoryId: Sequelize.INTEGER,
    price: Sequelize.FLOAT,
    slug: Sequelize.STRING,
},{
    paranoid: true
})

product.hasMany(productImage)
product.hasOne(productPrice)

module.exports = product