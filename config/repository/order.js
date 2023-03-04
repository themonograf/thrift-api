const conn = require("../database/database")
const model = require("../model/index");
const repository = {};

repository.createOrder = async function (req, callback) {
  const { product_id, type_sale, customer_name, customer_phonenumber, customer_address, sell_price, basic_price, reseller_commision } = req.body;
  const t = await conn.db.transaction()
  try {
    await model.product.update({isSold:true}, {where: {id:req.body.product_id}}, {transaction:t})

    await model.order.create({
      productId : product_id,
      typeSale : type_sale,
      resellerId : req.user_id,
      customerName : customer_name,
      customerPhonenumber : customer_phonenumber,
      customerAddress : customer_address,
      basicPrice : basic_price,
      sellPrice : sell_price,
      resellerCommision : reseller_commision,
      status : 1,
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
  if(req.query.reseller_id != "" && req.query.reseller_id != undefined){
    condition.resellerId = req.query.reseller_id
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
