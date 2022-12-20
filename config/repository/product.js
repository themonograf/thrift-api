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
    if((req.user_id) && req.user_id > 0){
      if(req.query.type=="catalog"){
        await model.productPrice.findAll({
          attributes: ["productId"],
          group: ["productId"],
          where: {
            resellerId: {[Op.eq]:req.user_id}
          }
        }).then(function (productPrice) {
          const productIds = productPrice.map(pPrice => pPrice.productId);
          queryCondition.id = {
            [Op.notIn]: productIds
          }
        });
        
      }else if(req.query.type=="reseller"){
        includeCondition[1] = {model: model.productPrice, where: {resellerId: req.user_id}, required: true}
      }else{
        includeCondition[1] = {model: model.productPrice, where: {resellerId: req.user_id}, required: false}
      }
    }else{
      if (resellerId > 0) {
        includeCondition[1] = {model: model.productPrice, where: {resellerId: resellerId, enable: true}}
      }
    }

    const offset = helper.getOffset(req.query.page, req.query.limit);
    
    const { count, rows } = await model.product.findAndCountAll({
      distinct: true,
      where: queryCondition,
      // offset: parseInt(req.query.page),
      offset,
      limit: parseInt(req.query.limit),
      order: [["name", "ASC"]],
      include: includeCondition,
      exclude: [{model: model.productPrice, where: {resellerId: req.user_id}, required: true}]
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

repository.getProductByslug = async function (slug, resellerId, userId, callback) {
  try {
    includeCondition = []

    includeCondition[0] = {model: model.productImage}
    if((userId) && userId > 0){
      includeCondition[1] = {model: model.productPrice, where: {resellerId: userId}, required: false}
    }else{
      if (resellerId > 0) {
        includeCondition[1] = {model: model.productPrice, where: {resellerId: resellerId, enable: true}}
      }
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
