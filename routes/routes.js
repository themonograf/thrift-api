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
      route: "/select-box",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
      ],
      controllerModel: controller.productCategory.getSelectProductCategory,
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
  product: [
    {
      route: "/",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.product.validate("createProduct"),
      ],
      controllerModel: controller.product.createProduct,
    },
    {
      route: "/",
      method: "put",
      middleware: [
        middleware.auth.checkToken,
        middleware.product.validate("updateProduct"),
      ],
      controllerModel: controller.product.updateProduct,
    },
    {
      route: "/",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.product.validate("getAllProduct"),
      ],
      controllerModel: controller.product.getAllProduct,
    },
    {
      route: "/:id",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.product.validate("getProductById"),
      ],
      controllerModel: controller.product.getProductById,
    },
    {
      route: "/:id",
      method: "delete",
      middleware: [
        middleware.auth.checkToken,
        middleware.product.validate("deleteProduct"),
      ],
      controllerModel: controller.product.deleteProduct,
    },
  ],
  product_image: [
    {
      route: "/:id",
      method: "delete",
      middleware: [
        middleware.auth.checkToken,
        middleware.productImage.validate("deleteProductImage"),
      ],
      controllerModel: controller.productImage.deleteProductImage,
    },
  ],
  master_image: [
    {
      route: "/:category",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.masterImage.validate("getSelectMasterImage"),
      ],
      controllerModel: controller.masterImage.getSelectMasterImage,
    },
  ],
  reseller: [
    {
      route: "/",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.reseller.validate("getAllReseller"),
      ],
      controllerModel: controller.reseller.getAllReseller,
    },
    {
      route: "/:id",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.reseller.validate("getResellerById"),
      ],
      controllerModel: controller.reseller.getResellerById,
    },
    {
      route: "/",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.reseller.validate("createReseller"),
      ],
      controllerModel: controller.reseller.createReseller,
    },
    {
      route: "/",
      method: "put",
      middleware: [
        middleware.auth.checkToken,
        middleware.reseller.validate("updateReseller"),
      ],
      controllerModel: controller.reseller.updateReseller,
    },
    {
      route: "/:id",
      method: "delete",
      middleware: [
        middleware.auth.checkToken,
        middleware.reseller.validate("deleteReseller"),
      ],
      controllerModel: controller.reseller.deleteReseller,
    },
  ],
  product_item: [
    {
      route: "/",
      method: "get",
      middleware: [
        middleware.auth.checkToken,
        middleware.productItem.validate("getProductItemByReseller"),
      ],
      controllerModel: controller.productItem.getProductItemByReseller,
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
      route: "/reseller/item",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.productItem.validate("createUpdateProductItem")
      ],
      controllerModel: controller.productItem.createUpdateProductItem,
    },
    {
      route: "/reseller/order",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
        middleware.order.validate("createOrderCatalog")
      ],
      controllerModel: controller.order.createOrderCatalog,
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
  ],
  upload: [
    {
      route: "/",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
      ],
      controllerModel: controller.upload.uploadSingle,
    },
    {
      route: "/bulk",
      method: "post",
      middleware: [
        middleware.auth.checkToken,
      ],
      controllerModel: controller.upload.uploadMultiple,
    },
  ]
};

module.exports = listRoutes;
