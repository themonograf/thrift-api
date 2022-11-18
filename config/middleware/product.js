const { query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "getAllProduct": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
  }
};

module.exports = middleware;
