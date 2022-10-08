const controller = require("../controller")
// const listRoutes = {}

const listRoutes = [{
    route: "/login",
    method: "post",
    func: "login",
    controllerModel: controller.user.login
}]
// { 
//     user: [{
//         route: "/",
//         method: "get",
//         func: "getUser",
//         controllerModel: controller.user.getAll,
//     }, {
//         route: "/",
//         method: "post",
//         func: "createUser",
//         controllerModel: controller.user.createUser,
//     }, {
//         route: "/",
//         method: "get",
//         func: "updateUser",
//         controllerModel: controller.user.updateUser,
//     }, {
//         route: "/",
//         method: "get",
//         func: "deleteUser",
//         controllerModel: controller.user.deleteUser,
//     }],
    // auth: [{
    //     [{
    //     route: "/login",
    //     method: "post",
    //     func: "login",
    //     controllerModel: controller.user.login
    // }]
//     productCategory: [{
//         route: "/",
//         method: "get",
//         func: "getProductCategory",
//         controllerModel: controller.productCategory.getAllProductCategory,
//     }, {
//         route: "/",
//         method: "post",
//         func: "createProductCategory",
//         controllerModel: controller.productCategory.createProductCategory,
//     }, {
//         route: "/",
//         method: "get",
//         func: "updateProductCategory",
//         controllerModel: controller.productCategory.updateProductCategory,
//     }, {
//         route: "/",
//         method: "get",
//         func: "deleteProductCategory",
//         controllerModel: controller.productCategory.deleteProductCategory,
//     }],
// }

module.exports = listRoutes
