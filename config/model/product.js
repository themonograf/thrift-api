const Sequelize = require("sequelize")
const productImage = require("./product_image")
const productItem = require("./product_item")
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
product.hasOne(productItem)

module.exports = product