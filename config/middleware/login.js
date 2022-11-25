const { body } = require("express-validator");
const middleware = {};

middleware.validate = (method) => {
  switch (method) {
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
