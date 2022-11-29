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
      middleware: [middleware.login.validate("login")],
      controllerModel: controller.user.login,
    },
    {
      route: "/refresh",
      method: "post",
      middleware: [
        middleware.login.validate("refresh"),
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
      route: "/reseller",
      method: "get",
      middleware: [],
      controllerModel: controller.reseller.getResellerByUsername,
    },
    {
      route: "/reseller/price",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.productPrice.validate("createUpdateProductPrice")
      ],
      controllerModel: controller.productPrice.createUpdateProductPrice,
    },
    {
      route: "/product",
      method: "get",
      middleware: [
        middleware.auth.checkTokenOptional,
        middleware.product.validate("getAllProduct"),
      ],
      controllerModel: controller.product.getAllProductCatalog,
    },
    {
      route: "/product/:slug",
      method: "get",
      middleware: [
        middleware.auth.checkTokenOptional,
        middleware.product.validate("getProductBySlug"),
      ],
      controllerModel: controller.product.getProductByslug,
    },
    {
      route: "/product-category",
      method: "get",
      middleware: [],
      controllerModel: controller.productCategory.getAllProductCategoryCatalog,
    },
    {
      route: "/login",
      method: "post",
      middleware: [middleware.login.validate("login")],
      controllerModel: controller.reseller.loginReseller,
    },
    {
      route: "/refresh",
      method: "post",
      middleware: [
        middleware.login.validate("refresh"),
        middleware.auth.checkRefreshToken,
      ],
      controllerModel: controller.reseller.refreshTokenReseller,
    },
  ]
};

module.exports = listRoutes;
