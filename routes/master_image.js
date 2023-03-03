const express = require("express");
const router = express.Router();
const listRoutes = require("./routes");

listRoutes["master_image"].map((x) =>
  router[x.method](x.route, x.middleware, x.controllerModel)
);

module.exports = router;
