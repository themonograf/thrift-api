const { validationResult } = require("express-validator");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const repository = require("../config/repository/index");
const { sign, decode } = require("jsonwebtoken");

const controller = {};

controller.createUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const salt = genSaltSync(10);
  req.body.password = hashSync(req.body.password, salt);

  repository.user.createUser(req, (err) => {
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

controller.updateUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.user.updateUser(req, (err) => {
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

controller.deleteUser = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.user.deleteUser(req, (err) => {
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

controller.getAll = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.user.getAllUser(req, (err, result) => {
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

controller.login = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.user.getUserByUsername(req.body.username, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }
    if (!results) {
      return res.status(404).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const result = compareSync(req.body.password, results.password);
    if (result) {
      const username = results.username;
      results.password = undefined;
      const accessToken = sign({ username }, process.env.JWT_KEY, {
        expiresIn: "4h",
      });
      const refreshToken = sign({ username }, process.env.JWT_KEY_REFRESH, {
        expiresIn: "8h",
      });

      return res.json({
        success: true,
        data: results,
        accessToken,
        refreshToken,
        expiresAt: decode(accessToken, process.env.JWT_KEY)?.exp,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Invalid Username or Password",
    });
  });
};

controller.refreshToken = async function (req, res) {
  const errors = validationResult(req);
  const { username } = req.locales;

  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const accessToken = sign({ username }, process.env.JWT_KEY, {
    expiresIn: "4h",
  });
  const refreshToken = sign({ username }, process.env.JWT_KEY_REFRESH, {
    expiresIn: "8h",
  });
  return res.status(200).json({
    success: true,
    accessToken,
    expiresAt: decode(accessToken, process.env.JWT_KEY)?.exp,
    refreshToken,
  });
};

module.exports = controller;
