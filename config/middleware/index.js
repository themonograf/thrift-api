const user = require("./user")
const auth = require("./auth")
const productCategory = require("./product_category")
const product = require("./product")
const login = require("./login")
const productItem = require("./product_item")

const middleware = {}

middleware.user = user
middleware.auth = auth
middleware.productCategory = productCategory
middleware.product = product
middleware.login = login
middleware.productItem = productItem

module.exports = middleware