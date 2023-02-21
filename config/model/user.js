const Sequelize = require("sequelize")
const conn = require("../database/database")

var user = conn.db.define('user',{
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
},{
    paranoid: true
})

module.exports = user