const Sequelize = require("sequelize")
const conn = {}
const db = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            "underscored": true
        }
    }
)

conn.Sequelize = Sequelize
conn.db = db

module.exports = conn