const express = require("express")
const router = express.Router()
const middleware = require("../config/middleware/index")
const listRoutes = require("./routes")

listRoutes.map(x => router[x.method](x.route, [middleware.user.validate(x.func)], x.controllerModel))

module.exports = router