const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const productImage = require("./product_image")
const productItem = require("./product_item")
const reseller = require("./reseller")
const order = require("./order")
const model = {}

model.user = user
model.productCategory = productCategory
model.product = product
model.productImage = productImage
model.productItem = productItem
model.reseller = reseller
model.order = order
module.exports = model