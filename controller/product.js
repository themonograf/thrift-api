const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.getAllProductCatalog = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.product.getAllProductCatalog(
    req,
    (err, result) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      }
      return res.json({
        success: true,
        data: result,
      });
    }
  );
};

module.exports = controller;
