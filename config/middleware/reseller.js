const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createReseller": {
      return [
        body("name", "Name is required").notEmpty().exists(),
        body("phone_number", "Phone Number is required").notEmpty().exists(),
        body("username", "Username is required").notEmpty().exists(),
        body("password", "Password is required").notEmpty().exists(),
        body("is_admin", "Is Admin is required").notEmpty().exists().isBoolean(),
      ];
    }
    case "updateReseller": {
      return [
        body("id", "Id is required").notEmpty().exists(),
        body("name", "Name is required").notEmpty().exists(),
        body("phone_number", "Phone Number is required").notEmpty().exists(),
        body("username", "Username is required").notEmpty().exists(),
        body("is_admin", "Is Admin is required").notEmpty().exists().isBoolean(),
      ];
    }
    case "deleteReseller": {
      return [param("id", "Id is required").notEmpty().exists().isInt()];
    }
    case "getAllReseller": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
    case "getResellerById": {
      return [param("id", "Id is required").notEmpty().exists().isInt()];
    }
  }
};

module.exports = middleware;
