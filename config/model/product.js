const Sequelize = require("sequelize")
const productImage = require("./product_image")
const productItem = require("./product_item")
const conn = require("../database/database")

var product = conn.db.define('product',{
    name: Sequelize.STRING,
    variant: Sequelize.STRING,
    description: Sequelize.STRING,
    productCategoryId: Sequelize.INTEGER,
    basicPrice: Sequelize.FLOAT,
    price: Sequelize.FLOAT,
    olshopPrice: Sequelize.FLOAT,
    minLivePrice: Sequelize.FLOAT,
    slug: Sequelize.STRING,
    isSold: Sequelize.BOOLEAN,
},{
    paranoid: true
})

product.hasMany(productImage)
product.hasOne(productItem)

module.exports = product