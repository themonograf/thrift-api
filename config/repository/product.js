const { Op } = require("sequelize");
const model = require("../model/index");
const helper = require("../../helper/helper");
const repository = {};

repository.getAllProductCatalog = async function (req, resellerId, callback) {
  try {
    queryCondition = {}
    if (req.query.keyword != "") {
      queryCondition.name = {
        [Op.like]: "%" + req.query.keyword + "%" 
      }
    }

    if (req.query.product_category_id) {
      queryCondition.productCategoryId = {
        [Op.eq]: req.query.product_category_id 
      }
    }

    includeCondition = []

    includeCondition[0] = {model: model.productImage}
    if (resellerId > 0) {
      includeCondition[1] = {model: model.productPrice, where: {resellerId: resellerId}}
    }

    const offset = helper.getOffset(req.query.page, req.query.limit);
    console.log("offset: " + offset)

    const { count, rows } = await model.product.findAndCountAll({
      distinct: true,
      where: queryCondition,
      // offset: parseInt(req.query.page),
      offset,
      limit: parseInt(req.query.limit),
      order: [["name", "ASC"]],
      include: includeCondition
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    return callback(error);
  }
};

repository.getProductByslug = async function (slug, resellerId, callback) {
  try {
    includeCondition = []

    includeCondition[0] = {model: model.productImage}
    if (resellerId > 0) {
      includeCondition[1] = {model: model.productPrice, where: {resellerId: resellerId}}
    }
    const data = await model.product.findOne({
      where : {slug: slug},
      include: includeCondition,
    });
    return callback(null, data);
  } catch (error) {
    return callback(error);
  }
};

module.exports = repository;
