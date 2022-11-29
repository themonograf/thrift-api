const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.createUpdateProductPrice = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  if((req.body.id) && req.body.id > 0){
    await repository.productPrice.updateProductPrice(req, (err) => {
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
    await repository.productPrice.createProductPrice(req, (err) => {
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

module.exports = controller;
