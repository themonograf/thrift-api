const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const reseller = require("./reseller")
const controller = {}

controller.user = user
controller.productCategory = productCategory
controller.product = product
controller.reseller = reseller
module.exports=controller