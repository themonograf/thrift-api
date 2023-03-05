const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.createUpdateProductItem = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  req.body.resellerId = req.user_id
  await repository.productItem.upsertProductItem(req, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }
    return res.json({
      success: true,
      data: [],
    });
  });
};

controller.getProductItemByReseller = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productItem.getProductItemByReseller(req, (err, result) => {
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
  });
};

module.exports = controller;
