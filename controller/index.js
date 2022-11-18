const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const controller = {}

controller.user = user
controller.productCategory = productCategory
controller.product = product
module.exports=controller