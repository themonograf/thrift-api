const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createProductCategory": {
      return [
        body("category", "Category is required").notEmpty().exists(),
      ];
    }
    case "updateProductCategory": {
      return [
        body("category", "Category is required").notEmpty().exists(),
        body("id", "Id is required").notEmpty().exists(),
      ];
    }
    case "deleteProductCategory": {
      return [param("id", "Id is required").notEmpty().exists().isInt()];
    }
    case "getProductCategory": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
    case "getAProductCategory": {
      return [param("id", "ID must be a number").notEmpty().exists().isInt()];
    }
  }
};

module.exports = middleware;
