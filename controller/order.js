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

controller.getAllOrder = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.order.getAllOrder(req, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }
    return res.json({
      success: true,
      data: result,
    });
  });
};

controller.approveOrder = async function (req, res) {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataOrder = {}
  await repository.order.getOrderById(id, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    } else {
      dataOrder = results
    }
  });

  if(dataOrder.status != 1){
    return res.status(404).json({
      success: false,
      message: "Order Not Found",
    });
  }

  await repository.order.updateOrder({status:2, id:dataOrder.id}, (err) => {
    if (err) {
      return res.status(400).json({
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

controller.successOrder = async function (req, res) {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataOrder = {}
  await repository.order.getOrderById(id, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    } else {
      dataOrder = results
    }
  });

  if(dataOrder.status != 2){
    return res.status(404).json({
      success: false,
      message: "Order Not Found",
    });
  }

  await repository.order.updateOrder({status:3, id:dataOrder.id}, (err) => {
    if (err) {
      return res.status(400).json({
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

controller.declineOrder = async function (req, res) {
  const { id } = req.params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataOrder = {}
  await repository.order.getOrderById(id, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    } else {
      dataOrder = results
    }
  });

  if(dataOrder.status == 3){
    return res.status(404).json({
      success: false,
      message: "Order Not Found",
    });
  }

  await repository.order.declineOrder(dataOrder.id, dataOrder.productId, (err) => {
    if (err) {
      return res.status(400).json({
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
