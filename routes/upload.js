const express = require("express");
const router = express.Router();
const listRoutes = require("./routes");

listRoutes["upload"].map((x) => router[x.method](x.route, x.middleware, x.controllerModel));

module.exports = router;
