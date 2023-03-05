const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createOrderCatalog": {
      return [
        body("productId", "Product Id is required").notEmpty().exists().isInt({min:1}),
        body("typeSale", "Type Sale is required").notEmpty().exists().isInt({min:1}),
        body("customerName", "Customer Name is required").notEmpty().exists(),
        body("customerPhonenumber", "Customer Phonenumber is required").notEmpty().exists(),
        body("customerAddress", "Customer Address is required").notEmpty().exists(),
        body("sellPrice", "Price is required").notEmpty().exists().isInt({min:1}),
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
