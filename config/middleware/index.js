const user = require("./user")
const auth = require("./auth")
const productCategory = require("./product_category")
const product = require("./product")

const middleware = {}

middleware.user = user
middleware.auth = auth
middleware.productCategory = productCategory
middleware.product = product

module.exports = middleware