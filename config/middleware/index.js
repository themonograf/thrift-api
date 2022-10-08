const user = require("./user")
const auth = require("./auth")
const productCategory = require("./product_category")

const middleware = {}

middleware.user = user
middleware.auth = auth
middleware.productCategory = productCategory

module.exports = middleware