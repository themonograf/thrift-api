const controller = require("../controller")

const listRoutes = { 
    user: [{
        route: "/",
        method: "get",
        func: "getUser",
        controllerModel: controller.user.getAll,
    }, {
        route: "/",
        method: "post",
        func: "createUser",
        controllerModel: controller.user.createUser,
    }, {
        route: "/",
        method: "put",
        func: "updateUser",
        controllerModel: controller.user.updateUser,
    }, {
        route: "/:id",
        method: "delete",
        func: "deleteUser",
        controllerModel: controller.user.deleteUser,
    }],
    auth: [{
        route: "/login",
        method: "post",
        func: "login",
        controllerModel: controller.user.login
    }],
    productCategory: [{
        route: "/",
        method: "get",
        func: "getProductCategory",
        controllerModel: controller.productCategory.getAllProductCategory,
    }, {
        route: "/",
        method: "post",
        func: "createProductCategory",
        controllerModel: controller.productCategory.createProductCategory,
    }, {
        route: "/",
        method: "put",
        func: "updateProductCategory",
        controllerModel: controller.productCategory.updateProductCategory,
    }, {
        route: "/:id",
        method: "delete",
        func: "deleteProductCategory",
        controllerModel: controller.productCategory.deleteProductCategory,
    }],
    catalog: [{
        route: "/catalog",
        method: "get",
        controllerModel: controller.productCategory.getAllProductCategoryCatalog,
    }],
}

module.exports = listRoutes
