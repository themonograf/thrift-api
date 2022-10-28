const { body, param, query } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("name", "Name is required").notEmpty().exists(),
        body("username", "Username is required").notEmpty().exists(),
        body("password", "Password is required").notEmpty().exists(),
      ];
    }
    case "updateUser": {
      return [
        body("name", "Name is required").notEmpty().exists(),
        body("username", "Username is required").notEmpty().exists(),
        body("id", "Id is required").notEmpty().exists(),
      ];
    }
    case "deleteUser": {
      return [param("id", "Id is required").notEmpty().exists().isInt()];
    }
    case "getUser": {
      return [
        query("page", "Page is required").notEmpty().exists().isInt(),
        query("limit", "Limit is required").notEmpty().exists().isInt(),
      ];
    }
    case "login": {
      return [
        body("username", "Username is required").notEmpty().exists(),
        body("password", "Password is required").notEmpty().exists(),
      ];
    }
    case "refresh": {
      return [
        body("refreshToken", "Refresh token is required").notEmpty().exists(),
      ];
    }
  }
};

module.exports = middleware;
