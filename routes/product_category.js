const express = require("express");
const router = express.Router();
const listRoutes = require("./routes");

listRoutes["productCategory"].map((x) =>
  router[x.method](x.route, x.middleware, x.controllerModel)
);
listRoutes["catalogProductCategory"].map((x) => router[x.method](x.route, x.controllerModel));

module.exports = router;
