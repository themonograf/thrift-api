const Sequelize = require("sequelize")
const conn = require("../database/database")

var productCategory = conn.db.define('product_category',{
    category: Sequelize.STRING,
    image: Sequelize.STRING,
},{
    paranoid: true
})

module.exports = productCategory