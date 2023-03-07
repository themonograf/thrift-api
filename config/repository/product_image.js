const { Op } = require("sequelize");
const conn = require("../database/database")
const model = require("../model/index");
const log = require("../service/log")
const repository = {};

repository.getAllProductImageByProductId = async function (productId, callback) {
  try {
    const data = await model.productImage.findAll({
      where: {
        productId: productId,
      },
      raw: true,
    });

    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

repository.getProductImageById = async function (productImageId, callback) {
  try {
    const data = await model.productImage.findByPk(productImageId)
    return callback(null, data)
  } catch (error) {
    log.logger.error(error);
    return callback(error)
  }
}

repository.deleteProductImage = async function (id, image, callback) {
  const t = await conn.db.transaction()
  try {
    await model.productImage.destroy({where: { id:id }}, {transaction:t});

    await model.masterImage.masterImage.update({isTaken: false}, {where : {path : image}}, {transaction:t});

    await t.commit();

    return callback(null);
  } catch (error) {
    log.logger.error(error);
    await t.rollback();
    return callback(error.message);
  }
};

module.exports = repository;
