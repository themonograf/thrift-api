const { Op } = require("sequelize");
const model = require("../model/index");
const repository = {};

repository.createMasterImage = async function (data, callback) {
  try {
    await model.masterImage.masterImage.bulkCreate(data);
    return callback(null);
  } catch (error) {
    return callback(error);
  }
};

repository.getSelectMasterImage = async function (category, callback) {
  try {
    const data = await model.masterImage.masterImage.findAll({
      attributes: [['image', 'key'], ['SUBSTRING_INDEX(image, "/", -1)', 'value']],
      where: {
        category: category,
        isTaken: false,
      },
      order: [["value", "ASC"]],
    });

    return callback(null, data);
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

module.exports = repository;
