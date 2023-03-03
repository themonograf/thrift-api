const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.getSelectMasterImage = async function (req, res) {
  const { category } = req.params

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.masterImage.getSelectMasterImage(category, (err, result) => {
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
