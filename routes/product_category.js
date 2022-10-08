const express = require("express")
const router = express.Router()
const middleware = require("../config/middleware/index")
const listRoutes = require("./routes")

// listRoutes["productCategory"].map(x => router[x.method](x.route, [middleware.auth.checkToken, middleware.productCategory.validate(x.func)], x.controllerModel))

module.exports = router
