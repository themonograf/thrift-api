const conn = require("../database/database")
const model = require("../model/index");
const repository = {};

repository.createOrder = async function (req, callback) {
  const { productId, typeSale, customerName, customerPhonenumber, customerAddress, sellPrice, basicPrice, resellerCommision, status, resellerId } = req.body;
  const t = await conn.db.transaction()
  try {
    await model.product.update({isSold:true}, {where: {id:req.body.productId}}, {transaction:t})

    await model.order.create({
      productId,
      typeSale,
      customerName,
      customerPhonenumber,
      customerAddress,
      basicPrice,
      sellPrice,
      resellerCommision,
      status,
      resellerId,
    }, {transaction:t});

    await t.commit();

    return callback(null);
  } catch (error) {
    await t.rollback();
    return callback(error);
  }
};

repository.getAllOrder = async function (req, callback) {
  let condition = {}
  if(req.query.resellerId != "" && req.query.resellerId != undefined){
    condition.resellerId = req.query.resellerId
  }

  if(req.query.status != undefined && req.query.status > 0){
    condition.status = req.query.status
  }
  try {
    const { count, rows } = await model.order.findAndCountAll({
      where: condition,
      offset: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      order: [["status", "ASC"], ["updatedAt", "DESC"]],
      distinct: true,
      include : [{model: model.product}, {model: model.reseller}]
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    return callback(error);
  }
};

repository.getOrderById = async function (id, callback) {
  try {
    const data = await model.order.findByPk(id)
    return callback(null, data)
  } catch (error) {
    return callback(error)
  }
}

repository.updateOrder = async function (data, callback) {
  try {
    await model.order.update(data, {where: {id:data.id}})
    return callback(null)
  } catch (error) {
    return callback(error)
  }
}

repository.declineOrder = async function (orderId, productId, callback) {
  const t = await conn.db.transaction()
  try {
    await model.product.update({isSold:false}, {where: {id:productId}}, {transaction:t})

    await model.order.destroy({where : {id:orderId}}, {transaction:t});

    await t.commit();

    return callback(null);
  } catch (error) {
    await t.rollback();
    return callback(error);
  }
};

module.exports = repository;
