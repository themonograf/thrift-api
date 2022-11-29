const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const reseller = require("./reseller")
const productPrice = require("./product_price")
const repository = {}

repository.user = user
repository.productCategory = productCategory
repository.product = product
repository.reseller = reseller
repository.productPrice = productPrice
module.exports=repository