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

  await repository.product.getProductById(req.body.productId, (err, results) => {
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

  if(req.body.typeSale == 2){
    if(req.body.sellPrice < dataProduct.catalogPrice - 2000){
      return res.json({
        success: false,
        message: "Insufict Sell Price",
      });
    }
  }else{
    if(req.body.sellPrice < dataProduct.catalogPrice){
      return res.json({
        success: false,
        message: "Insufict Sell Price",
      });
    } 
  }

  req.body.resellerCommision = 0
  if(req.body.typeSale == 1){
    req.body.resellerCommision = req.body.sellPrice - dataProduct.catalogPrice
  }

  req.body.basicPrice = dataProduct.basicPrice
  req.body.resellerId = req.user_id
  req.body.status = 1

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
