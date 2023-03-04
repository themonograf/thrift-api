const Sequelize = require("sequelize")
const conn = require("../database/database")

const model = {}

model.masterImage = conn.db.define('master_image',{
    path: Sequelize.STRING,
    image: Sequelize.STRING,
    category: Sequelize.STRING,
    isTaken: Sequelize.BOOLEAN,
})

model.category = ["category","product","banner"] 

module.exports = model