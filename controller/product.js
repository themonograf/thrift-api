const { validationResult } = require("express-validator");
const repository = require("../config/repository/index");
const helper = require("../helper/string")

const controller = {};

controller.getAllProductCatalog = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  var resellerId = 0
  if((!req.user_id) || req.user_id <= 0){
    if((req.get("reseller")) && req.get("reseller") != ""){
      await repository.reseller.getResellerByUsername(req.get("reseller"), (err, results) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: err,
          });
        } else if (!results) {
          return res.status(404).json({
            success: false,
            message: "Reseller Not Found",
          });
        } else {
          resellerId = results.id
        }
      });
    }
  }

  await repository.product.getAllProductCatalog(
    req, resellerId,
    (err, result) => {
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
    }
  );
};

controller.getProductByslug = async function (req, res) {
  const { slug } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  var resellerId = 0
  var userId = 0
  if((req.user_id) && req.user_id > 0){
    userId = req.user_id
  }else{
    if((req.get("reseller")) && req.get("reseller") != ""){
      await repository.reseller.getResellerByUsername(req.get("reseller"), (err, results) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: err,
          });
        } else if (!results) {
          return res.status(404).json({
            success: false,
            message: "Reseller Not Found",
          });
        } else {
          resellerId = results.id
        }
      });
    }
  }

  await repository.product.getProductByslug(slug, resellerId, userId, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    } else {
      return res.json({
        success: true,
        data: results,
      });
    }
  });
};

controller.createProduct = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  const code = helper.generateRandomCode(req.body.prefix, 5)
  const slug = helper.generateSlug(req.body.name + "-" + code)

  var product = {
    name: req.body.name,
    variant: req.body.variant,
    description: req.body.description,
    productCategoryId: req.body.product_category_id,
    basicPrice: req.body.basic_price,
    price: req.body.catalog_price,
    olshopPrice: req.body.olshop_price,
    minLivePrice: req.body.min_live_price,
    slug: slug,
    isSold: false,
    code: code,
  }

  var masterImage = req.body.product_image.map((obj) => (obj.image))

  await repository.product.createProduct(product, req.body.product_image, masterImage, (err) => {
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

controller.updateProduct = async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  let dataProduct = {}
  await repository.product.getProductById(req.body.id, (err, results) => {
    if (err) {
      return res.status(400).json({
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

  const code = req.body.prefix.toUpperCase() == dataProduct.code.substr(0, dataProduct.code.length-5) ? dataProduct.code : helper.generateRandomCode(req.body.prefix, 5)
  const slug = req.body.name == dataProduct.name && req.body.prefix.toUpperCase() == dataProduct.code.substr(0, dataProduct.code.length-5) ? dataProduct.slug : helper.generateSlug(req.body.name + "-" + code)

  var product = {
    id: req.body.id,
    name: req.body.name,
    variant: req.body.variant,
    description: req.body.description,
    productCategoryId: req.body.product_category_id,
    basicPrice: req.body.basic_price,
    price: req.body.catalog_price,
    olshopPrice: req.body.olshop_price,
    minLivePrice: req.body.min_live_price,
    slug: slug,
    code: code,
  }

  var masterImageTaken = req.body.product_image.map((obj) => (obj.image))
  var masterImageDestroy = []

  const productImage = await repository.productImage.getAllProductImageByProductId(
    dataProduct.id,
    (err, result) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      }
      return result
    }
  );

  productImage.map((obj) => {
    if(!req.body.product_image.some(o => o.image == obj.image)) {
      masterImageDestroy.push(obj.image)
    }
  })
  
  await repository.product.updateProduct(product, req.body.product_image, masterImageTaken, masterImageDestroy, (err) => {
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

controller.getAllProduct = async function (req, res) {
  req.query.keyword = req.query.keyword || "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  repository.product.getAllProduct(req, (err, result) => {
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

controller.getProductById = async function (req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  await repository.product.getProductById(id, (err, results) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    } else if (!results) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    } else {
      return res.json({
        success: true,
        data: results,
      });
    }
  });
};

controller.deleteProduct = async function (req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      success: false,
      message: errors.array()[0].msg,
    });
  }

  var masterImageDestroy = []
  const productImage = await repository.productImage.getAllProductImageByProductId(
    id,
    (err, result) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: err,
        });
      }
      return result
    }
  );

  productImage.map((obj) => {
    masterImageDestroy.push(obj.image)
  })
  
  await repository.product.deleteProduct(id, masterImageDestroy, (err) => {
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
