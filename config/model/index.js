const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const productImage = require("./product_image")
const model = {}

model.user = user
model.productCategory = productCategory
model.product = product
model.productImage = productImage
module.exports = model