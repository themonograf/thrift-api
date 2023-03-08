const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, decode } = require("jsonwebtoken");

const controller = {};

controller.getResellerByUsername = async function (req, res) {
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
        results.password = undefined;
        return res.json({
          success: true,
          data: results,
        });
      }
    });
  }else{
    return res.status(404).json({
      success: false,
      message: "Reseller Not Found",
    });
  }
  
};

controller.loginReseller = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  await repository.reseller.getResellerByUsername(req.body.username, (err, results) => {
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
      const accessToken = sign({ username: username, id: results.id }, process.env.JWT_KEY, {
        expiresIn: "4h",
      });
      const refreshToken = sign({ username: username, id: results.id }, process.env.JWT_KEY_REFRESH, {
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

controller.refreshTokenReseller = async function (req, res) {
  const errors = validationResult(req);
  const data = req.locales;

  if (!errors.isEmpty()) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const accessToken = sign({ username: data.username, id: data.id }, process.env.JWT_KEY, {
    expiresIn: "4h",
  });
  const refreshToken = sign({ username: data.username, id: data.id }, process.env.JWT_KEY_REFRESH, {
    expiresIn: "8h",
  });
  return res.status(200).json({
    success: true,
    accessToken,
    expiresAt: decode(accessToken, process.env.JWT_KEY)?.exp,
    refreshToken,
  });
};

controller.createReseller = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { name, address, email, phoneNumber, tokopedia, shopee, instagram, username, password, isAdmin } = req.body

  const salt = genSaltSync(10);
  const newPassword = hashSync(password, salt);

  const reseller = {
    name,
    address,
    email,
    phoneNumber,
    tokopedia,
    shopee,
    instagram,
    username,
    password: newPassword,
    isAdmin,
  }

  repository.reseller.createReseller(reseller, (err) => {
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

controller.updateReseller = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const { id, name, address, email, phoneNumber, tokopedia, shopee, instagram, username, isAdmin, password } = req.body

  let reseller = {
    id,
    name,
    address,
    email,
    phoneNumber,
    tokopedia,
    shopee,
    instagram,
    username,
    isAdmin,
  }

  if(password != "" && password  != undefined){
    const salt = genSaltSync(10);
    reseller.password = hashSync(password, salt);
  }

  repository.reseller.updateReseller(reseller, (err) => {
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

controller.deleteReseller = async function (req, res) {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.reseller.deleteReseller(id, (err) => {
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

controller.getAllReseller = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.reseller.getAllReseller(req, (err, result) => {
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

controller.getResellerById = async function (req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  await repository.reseller.getResellerById(id, (err, results) => {
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

controller.getAllResellerSelectBox = async function (req, res) {
  repository.reseller.getAllResellerSelectBox((err, result) => {
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
