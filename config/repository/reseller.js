const { Op } = require("sequelize");
const model = require("../model/index");
const log = require("../service/log")
const repository = {};

repository.getResellerByUsername = async function (username, callback) {
  try {
    const data = await model.reseller.findOne({
      where : { username }
    });
    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

repository.getResellerById = async function (id, callback) {
  try {
    const data = await model.reseller.findByPk(id, {
      attributes: ['id','name','username','phoneNumber','email','address','tokopedia','shopee','instagram','isAdmin']
    });
    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

repository.createReseller = async function (data, callback) {
  try {
    await model.reseller.create(data)
    return callback(null)
  } catch (error) {
    log.logger.error(error);
    return callback(error)
  }
}

repository.updateReseller = async function (data, callback) {
  try {
    await model.reseller.update(data, {where: {id:data.id}})
    return callback(null)
  } catch (error) {
    log.logger.error(error);
    return callback(error)
  }
}

repository.deleteReseller = async function (id, callback) {
  try {
    await model.reseller.destroy({where: {id}})
    return callback(null)
  } catch (error) {
    log.logger.error(error);
    return callback(error)
  }
}

repository.getAllReseller = async function (req, callback) {
  try {
    const { count, rows } = await model.reseller.findAndCountAll({
      attributes: ['id','name','username','phoneNumber','email','address','tokopedia','shopee','instagram','isAdmin'],
      where: {
        [Op.or]: [
          {name: { [Op.like]: "%" + req.query.keyword + "%" }},
          {username: { [Op.like]: "%" + req.query.keyword + "%" }},
          {email: { [Op.like]: "%" + req.query.keyword + "%" }},
          {phoneNumber: { [Op.like]: "%" + req.query.keyword + "%" }},
        ],   
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

repository.getAllResellerSelectBox = async function (callback) {
  try {
    const data = await model.reseller.findAll({
      attributes: ['id','name','username'],
      order: [["name", "ASC"]],
    });

    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

module.exports = repository;
