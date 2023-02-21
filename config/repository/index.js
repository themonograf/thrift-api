const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const reseller = require("./reseller")
const productItem = require("./product_item")
const order = require("./order")
const repository = {}

repository.user = user
repository.productCategory = productCategory
repository.product = product
repository.reseller = reseller
repository.productItem = productItem
repository.order = order
module.exports=repository