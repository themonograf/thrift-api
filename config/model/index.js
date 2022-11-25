const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const productImage = require("./product_image")
const productPrice = require("./product_price")
const reseller = require("./reseller")
const model = {}

model.user = user
model.productCategory = productCategory
model.product = product
model.productImage = productImage
model.productPrice = productPrice
model.reseller = reseller
module.exports = model