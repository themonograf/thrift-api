const { Op } = require("sequelize");
const conn = require("../database/database")
const model = require("../model/index");
const log = require("../service/log")
const repository = {};

repository.createProductCategory = async function (req, callback) {
  const t = await conn.db.transaction()
  const { category, image } = req.body
  try {
    await model.productCategory.create({ category, image }, {transaction:t})
    
    if(image != "" && image != undefined){
      await model.masterImage.masterImage.update({isTaken: true}, {where : {image : image}}, {transaction:t});
    }

    await t.commit();

    return callback(null);
  } catch (error) {
    log.logger.error(error);
    await t.rollback();
    return callback(error.message);
  }
};

repository.updateProductCategory = async function (req, masterImage, callback) {
  const t = await conn.db.transaction()
  const { id, category, image } = req.body
  try {
    await model.productCategory.update({ category, image }, {where: {id}}, {transaction:t})
    
    if(masterImage.imageTaken != undefined && masterImage.imageTaken != ""){
      await model.masterImage.masterImage.update({isTaken: true}, {where : {image : masterImage.imageTaken}}, {transaction:t});
    }
    
    if(masterImage.imageDestroy != undefined && masterImage.imageDestroy != ""){
      await model.masterImage.masterImage.update({isTaken: false}, {where : {image : masterImage.imageDestroy}}, {transaction:t});
    }

    await t.commit();

    return callback(null);
  } catch (error) {
    log.logger.error(error);
    await t.rollback();
    return callback(error.message);
  }
};

repository.deleteProductCategory = async function (productCategory, callback) {
  const t = await conn.db.transaction()
  try {
    await model.productCategory.destroy({where: { id:productCategory.id }}, {transaction:t});

    await model.masterImage.masterImage.update({isTaken: false}, {where : {image : productCategory.image}}, {transaction:t});

    await t.commit();

    return callback(null);
  } catch (error) {
    log.logger.error(error);
    await t.rollback();
    return callback(error.message);
  }
};

repository.getAllProductCategory = async function (req, callback) {
  try {
    const { count, rows } = await model.productCategory.findAndCountAll({
      where: {
        category: { [Op.like]: "%" + req.query.keyword + "%" },
      },
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

repository.getProductCategoryById = async function (id, callback) {
  try {
    const data = await model.productCategory.findByPk(id);
    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

repository.getAllProductCategoryCatalog = async function (req, callback) {
  req.query.keyword = req.query.keyword ?? ""
  try {
    const data = await model.productCategory.findAll({
      attributes: ['id','category','image'],
      where: {
        category: { [Op.like]: "%" + req.query.keyword + "%" },
      },
      order: [["category", "ASC"]],
    });

    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

module.exports = repository;
