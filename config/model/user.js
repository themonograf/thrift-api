const Sequelize = require("sequelize")
const db = require("../database/database")

var user = db.define('user',{
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
},{
    paranoid: true
})

module.exports = user