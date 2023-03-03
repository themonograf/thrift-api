const user = require("./user")
const auth = require("./auth")
const productCategory = require("./product_category")
const product = require("./product")
const login = require("./login")
const productItem = require("./product_item")
const order = require("./order")
const productImage = require("./product_image")
const masterImage = require("./master_image")

const middleware = {}

middleware.user = user
middleware.auth = auth
middleware.productCategory = productCategory
middleware.product = product
middleware.login = login
middleware.productItem = productItem
middleware.order = order
middleware.productImage = productImage
middleware.masterImage = masterImage

module.exports = middleware