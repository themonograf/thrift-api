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

repository.getProductItemByReseller = async function (req, callback) {
  try {
    const { count, rows } = await model.product.findAndCountAll({
      attributes: ['id','name','variant'],
      where: {
        isSold: false,
        name: { [Op.like]: "%" + req.query.keyword + "%" }  
      },
      include: [{model: model.productItem, where: {resellerId: req.query.reseller_id}}],
      offset: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      order: [["updatedAt", "DESC"]],
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

module.exports = repository;
