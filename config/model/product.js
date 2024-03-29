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
    catalogPrice: Sequelize.FLOAT,
    olshopPrice: Sequelize.FLOAT,
    minLivePrice: Sequelize.FLOAT,
    slug: Sequelize.STRING,
    isSold: Sequelize.BOOLEAN,
    code: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
},{
    paranoid: true
})

product.hasMany(productImage, {foreignKey:'productId', as: "productImage"})
product.hasOne(productItem, {foreignKey:'productId', as: "productItem"})

module.exports = product