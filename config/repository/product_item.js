const { Op } = require("sequelize");
const model = require("../model/index");
const repository = {};

repository.createProductItem = async function (req, callback) {
  try {
    resellerId = req.user_id
    const { product_id, price, description, enable, tokopedia, shopee, link } = req.body;
    const productId = product_id
    await model.productItem.create({
      productId,
      resellerId,
      price,
      description,
      enable,
      tokopedia, 
      shopee, 
      link,
    });
    return callback(null);
  } catch (error) {
    return callback(error);
  }
};

repository.updateProductItem = async function (req, callback) {
  try {
    resellerId = req.user_id
    const { id, product_id, price, description, enable, tokopedia, shopee, link } = req.body;
    const productId = product_id
    await model.productItem.update(
      {
        productId,
        resellerId,
        price,
        description,
        enable,
        tokopedia, 
        shopee, 
        link,
      },
      {
        where: { id },
      }
    );

    return callback(null);
  } catch (error) {
    return callback(error);
  }
};

module.exports = repository;
