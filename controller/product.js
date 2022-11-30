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

  var resellerId = 0
  var userId = 0
  if((req.user_id) && req.user_id > 0){
    userId = req.user_id
  }else{
    if((req.get("reseller")) && req.get("reseller") != ""){
      await repository.reseller.getResellerByUsername(req.get("reseller"), (err, results) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: err,
          });
        } else if (!results) {
          return res.status(404).json({
            success: false,
            message: "Reseller Not Found",
          });
        } else {
          resellerId = results.id
        }
      });
    }
  }

  await repository.product.getAllProductCatalog(
    req, resellerId,
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

controller.getProductByslug = async function (req, res) {
  const { slug } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  var resellerId = 0
  var userId = 0
  if((req.user_id) && req.user_id > 0){
    userId = req.user_id
  }else{
    if((req.get("reseller")) && req.get("reseller") != ""){
      await repository.reseller.getResellerByUsername(req.get("reseller"), (err, results) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: err,
          });
        } else if (!results) {
          return res.status(404).json({
            success: false,
            message: "Reseller Not Found",
          });
        } else {
          resellerId = results.id
        }
      });
    }
  }

  await repository.product.getProductByslug(slug, resellerId, userId, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    } else {
      return res.json({
        success: true,
        data: results,
      });
    }
  });
};

module.exports = controller;
