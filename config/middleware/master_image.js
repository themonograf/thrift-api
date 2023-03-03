const { param } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "getSelectMasterImage": {
      return [param("category", "Category is required").notEmpty().exists()];
    }
  }
};

module.exports = middleware;
