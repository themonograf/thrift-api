const { Op } = require("sequelize");
const model = require("../model/index");
const repository = {};

repository.createProductPrice = async function (req, callback) {
  try {
    resellerId = req.user_id
    const { product_id, price, description, enable } = req.body;
    const productId = product_id
    await model.productPrice.create({
      productId,
      resellerId,
      price,
      description,
      enable,
    });
    return callback(null);
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

repository.updateProductPrice = async function (req, callback) {
  try {
    resellerId = req.user_id
    const { id, product_id, price, description, enable } = req.body;
    const productId = product_id
    await model.productPrice.update(
      {
        productId,
        resellerId,
        price,
        description,
        enable,
      },
      {
        where: { id },
      }
    );

    return callback(null);
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

module.exports = repository;
