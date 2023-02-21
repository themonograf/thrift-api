const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");

const controller = {};

controller.createOrderCatalog = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataProduct = {}

  await repository.product.getProductById(req.body.product_id, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    } else {
      dataProduct = results
    }
  });

  if(req.body.type_sale == 2){
    if(req.body.sell_price < dataProduct.price - 2000){
      return res.json({
        success: false,
        message: "Insufict Sell Price",
      });
    }
  }else{
    if(req.body.sell_price < dataProduct.price){
      return res.json({
        success: false,
        message: "Insufict Sell Price",
      });
    } 
  }

  req.body.reseller_commision = 0
  if(req.body.type_sale == 1){
    req.body.reseller_commision = req.body.sell_price - dataProduct.price
  }

  req.body.basic_price = dataProduct.basicPrice

  await repository.order.createOrder(req, (err) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }
    return res.json({
      success: true,
      data: [],
    });
  });

};

module.exports = controller;
