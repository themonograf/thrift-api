const { Op } = require("sequelize");
const model = require("../model/index");
const repository = {};

repository.getAllProductCatalog = async function (req, callback) {
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

    const { count, rows } = await model.product.findAndCountAll({
      distinct: true,
      where: queryCondition,
      offset: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      order: [["name", "ASC"]],
      include: [
        {model: model.productImage}
      ]
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    return callback(error);
  }
};

module.exports = repository;
