const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const reseller = require("./reseller")
const productItem = require("./product_item")
const order = require("./order")
const controller = {}

controller.user = user
controller.productCategory = productCategory
controller.product = product
controller.reseller = reseller
controller.productItem = productItem
controller.order = order
module.exports=controller