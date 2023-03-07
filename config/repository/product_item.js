const { Op } = require("sequelize");
const model = require("../model/index");
const log = require("../service/log")
const repository = {};

repository.upsertProductItem = async function (req, callback) {
  try {
    const { id, productId, price, description, enable, tokopedia, shopee, link, resellerId } = req.body;
    await model.productItem.upsert({
      id,
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
    log.logger.error(error);
    return callback(error);
  }
};

repository.getProductItemByReseller = async function (req, callback) {
  try {
    const { count, rows } = await model.product.findAndCountAll({
      attributes: ['id','name','variant'],
      where: {
        isSold: false,
        name: { [Op.like]: "%" + req.query.keyword + "%" }  
      },
      distinct: true,
      include: [{model: model.productItem, where: {resellerId: req.query.resellerId}}],
      offset: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      order: [["updatedAt", "DESC"]],
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

module.exports = repository;
