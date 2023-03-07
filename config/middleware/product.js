const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "getAllProduct": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
    case "getProductBySlug": {
      return [param("slug", "Slug is required").notEmpty().exists()];
    }
    case "createProduct": {
      return [
        body("productCategoryId", "Category is required").notEmpty().exists().isInt(),
        body("name", "Name is required").notEmpty().exists(),
        body("variant", "Variant is required").notEmpty().exists(),
        body("prefix", "Prefix Code is required").notEmpty().exists(),
        body("description", "Description is required").notEmpty().exists(),
        body("basicPrice", "Basic Price is required").notEmpty().exists().isInt(),
        body("catalogPrice", "Catalog Price is required").notEmpty().exists().isInt(),
        body("olshopPrice", "Olshop Price is required").notEmpty().exists().isInt(),
        body("minLivePrice", "Min Live Price is required").notEmpty().exists().isInt(),
        body("productImage", "Product Image is required").isArray({min:1}).notEmpty().exists(),
      ];
    }
    case "updateProduct": {
      return [
        body("id", "Id is required").notEmpty().exists().isInt(),
        body("productCategoryId", "Category is required").notEmpty().exists().isInt(),
        body("name", "Name is required").notEmpty().exists(),
        body("variant", "Variant is required").notEmpty().exists(),
        body("description", "Description is required").notEmpty().exists(),
        body("basicPrice", "Basic Price is required").notEmpty().exists().isInt(),
        body("catalogPrice", "Catalog Price is required").notEmpty().exists().isInt(),
        body("olshopPrice", "Olshop Price is required").notEmpty().exists().isInt(),
        body("minLivePrice", "Min Live Price is required").notEmpty().exists().isInt(),
        body("productImage", "Product Image is required").isArray({min:1}).notEmpty().exists(),
      ];
    }
    case "getProductById": {
      return [param("id", "Id is required").notEmpty().exists()];
    }
    case "deleteProduct": {
      return [param("id", "Id is required").notEmpty().exists()];
    }
  }
};

module.exports = middleware;
