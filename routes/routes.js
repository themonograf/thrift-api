const controller = require("../controller");
const middleware = require("../config/middleware/index");

const listRoutes = {
  user: [
    {
      route: "/",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.user.validate("getUser"),
      ],
      controllerModel: controller.user.getAll,
    },
    {
      route: "/:username",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.user.validate("getUserData"),
      ],
      controllerModel: controller.user.getByUsername,
    },
    {
      route: "/",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.user.validate("createUser"),
      ],
      controllerModel: controller.user.createUser,
    },
    {
      route: "/",
      method: "put",
      middleware: [
        middleware.auth.checkToken,
        middleware.user.validate("updateUser"),
      ],
      controllerModel: controller.user.updateUser,
    },
    {
      route: "/:id",
      method: "delete",
      middleware: [
        middleware.auth.checkToken,
        middleware.user.validate("deleteUser"),
      ],
      controllerModel: controller.user.deleteUser,
    },
  ],
  auth: [
    {
      route: "/login",
      method: "post",
      middleware: [middleware.user.validate("login")],
      controllerModel: controller.user.login,
    },
    {
      route: "/refresh",
      method: "post",
      middleware: [
        middleware.user.validate("refresh"),
        middleware.auth.checkRefreshToken,
      ],
      controllerModel: controller.user.refreshToken,
    },
  ],
  productCategory: [
    {
      route: "/",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.productCategory.validate("getProductCategory"),
      ],
      controllerModel: controller.productCategory.getAllProductCategory,
    },
    {
      route: "/:id",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.productCategory.validate("getAProductCategory"),
      ],
      controllerModel: controller.productCategory.getProductCategory,
    },
    {
      route: "/",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.productCategory.validate("createProductCategory"),
      ],
      controllerModel: controller.productCategory.createProductCategory,
    },
    {
      route: "/",
      method: "put",
      middleware: [
        middleware.auth.checkToken,
        middleware.productCategory.validate("updateProductCategory"),
      ],
      controllerModel: controller.productCategory.updateProductCategory,
    },
    {
      route: "/:id",
      method: "delete",
      middleware: [
        middleware.auth.checkToken,
        middleware.productCategory.validate("deleteProductCategory"),
      ],
      controllerModel: controller.productCategory.deleteProductCategory,
    },
  ],
  catalog: [
    {
      route: "/catalog",
      method: "get",
      controllerModel: controller.productCategory.getAllProductCategoryCatalog,
    },
  ],
};

module.exports = listRoutes;
