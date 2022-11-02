const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.createProductCategory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productCategory.createProductCategory(req, (err) => {
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

controller.updateProductCategory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productCategory.updateProductCategory(req, (err) => {
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

controller.deleteProductCategory = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productCategory.deleteProductCategory(req, (err) => {
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

controller.getAllProductCategory = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productCategory.getAllProductCategory(req, (err, result) => {
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

controller.getProductCategory = async function (req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.productCategory.getProductCategoryById(id, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "ID Not Found",
      });
    } else {
      return res.json({
        success: true,
        data: results,
      });
    }
  });
};

controller.getAllProductCategoryCatalog = async function (req, res) {
  req.query.keyword = req.query.keyword || "";

  repository.productCategory.getAllProductCategoryCatalog(
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
