const user = require("./user")
const productCategory = require("./product_category")
const product = require("./product")
const repository = {}

repository.user = user
repository.productCategory = productCategory
repository.product = product
module.exports=repository