const model = require("../model/index");
const log = require("../service/log")
const repository = {};

repository.createMasterImage = async function (data, callback) {
  try {
    await model.masterImage.masterImage.bulkCreate(data);
    return callback(null);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

repository.getSelectMasterImage = async function (category, callback) {
  try {
    const data = await model.masterImage.masterImage.findAll({
      attributes: [['path', 'key'], ['image', 'value']],
      where: {
        category: category,
        isTaken: false,
      },
      order: [["value", "ASC"]],
    });

    return callback(null, data);
  } catch (error) {
    log.logger.error(error);
    return callback(error);
  }
};

module.exports = repository;
