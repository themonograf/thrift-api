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

  if((req.body.id) && req.body.id > 0){
    await repository.productItem.updateProductItem(req, (err) => {
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
  }else{
    await repository.productItem.createProductItem(req, (err) => {
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
  }
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
