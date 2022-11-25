const { Op } = require("sequelize");
const model = require("../model/index");
const repository = {};

repository.getResellerByUsername = async function (username, callback) {
  try {
    const data = await model.reseller.findOne({
      where : {username: username}
    });
    return callback(null, data);
  } catch (error) {
    return callback(error);
  }
};


module.exports = repository;
