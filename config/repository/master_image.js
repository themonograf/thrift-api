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

module.exports = repository;
