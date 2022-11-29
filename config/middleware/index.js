const user = require("./user")
const auth = require("./auth")
const productCategory = require("./product_category")
const product = require("./product")
const login = require("./login")
const productPrice = require("./product_price")

const middleware = {}

middleware.user = user
middleware.auth = auth
middleware.productCategory = productCategory
middleware.product = product
middleware.login = login
middleware.productPrice = productPrice

module.exports = middleware