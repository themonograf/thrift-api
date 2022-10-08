const Sequelize = require("sequelize")
const db = require("../database/database")

var productCategory = db.define('product_category',{
    category: Sequelize.STRING
},{
    paranoid: true
})

module.exports = productCategory