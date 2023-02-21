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

module.exports = repository;
