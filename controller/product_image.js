const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.deleteProductImage = async function (req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataProductImage = {}
  await repository.productImage.getProductImageById(id, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Product Image Not Found",
      });
    } else {
      dataProductImage = results
    }
  });

  await repository.productImage.deleteProductImage(id, dataProductImage.image, (err) => {
    if (err) {
      return res.status(400).json({
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

module.exports = controller;
