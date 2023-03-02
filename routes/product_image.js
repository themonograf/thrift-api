const express = require("express");
const router = express.Router();
const listRoutes = require("./routes");

listRoutes["product_image"].map((x) =>
  router[x.method](x.route, x.middleware, x.controllerModel)
);

module.exports = router;
