const { param } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "deleteProductImage": {
      return [param("id", "Id is required").notEmpty().exists()];
    }
  }
};

module.exports = middleware;
