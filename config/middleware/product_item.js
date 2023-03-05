const { body, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createUpdateProductItem": {
      return [
        body("productId", "Product Id is required").notEmpty().exists().isInt(),
        body("price", "Price is required").notEmpty().exists().isInt(),
        body("description", "Description is required").notEmpty().exists(),
        body("enable", "Enable is required").notEmpty().exists().isBoolean(),
      ];
    }
    case "getProductItemByReseller": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
        query("resellerId", "Reseller Id is required").notEmpty().exists().isInt(),
      ];
    }
  }
};

module.exports = middleware;
