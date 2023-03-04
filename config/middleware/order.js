const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createOrderCatalog": {
      return [
        body("product_id", "Product Id is required").notEmpty().exists().isInt({min:1}),
        body("type_sale", "Type Sale is required").notEmpty().exists().isInt({min:1}),
        body("customer_name", "Customer Name is required").notEmpty().exists(),
        body("customer_phonenumber", "Customer Phonenumber is required").notEmpty().exists(),
        body("customer_address", "Customer Address is required").notEmpty().exists(),
        body("sell_price", "Price is required").notEmpty().exists().isInt({min:1}),
      ];
    }
    case "getAllOrder": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
    case "changeStatusOrder": {
      return [param("id", "Id is required").notEmpty().exists()];
    }
  }
};

module.exports = middleware;
