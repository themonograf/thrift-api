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

  const { name, variant, description, productCategoryId, basicPrice, catalogPrice, olshopPrice, minLivePrice, prefix, productImage } = req.body

  const code = helper.generateRandomCode(prefix, 5)
  const slug = helper.generateSlug(name + "-" + code)

  var product = {
    name,
    variant,
    description,
    productCategoryId,
    basicPrice,
    catalogPrice,
    olshopPrice,
    minLivePrice,
    slug: slug,
    isSold: false,
    code: code,
  }

  var masterImage = productImage.map((obj) => (obj.image))

  await repository.product.createProduct(product, productImage, masterImage, (err) => {
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

  const { id, name, variant, description, productCategoryId, basicPrice, catalogPrice, olshopPrice, minLivePrice, prefix, productImage } = req.body

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

  const code = prefix.toUpperCase() == dataProduct.code.substr(0, dataProduct.code.length-5) ? dataProduct.code : helper.generateRandomCode(prefix, 5)
  const slug = name == dataProduct.name && prefix.toUpperCase() == dataProduct.code.substr(0, dataProduct.code.length-5) ? dataProduct.slug : helper.generateSlug(name + "-" + code)

  var product = {
    id,
    name,
    variant,
    description,
    productCategoryId,
    basicPrice,
    price,
    olshopPrice,
    minLivePrice,
    slug: slug,
    code: code,
  }

  var masterImageTaken = productImage.map((obj) => (obj.image))
  var masterImageDestroy = []

  const dataProductImage = await repository.productImage.getAllProductImageByProductId(
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

  dataProductImage.map((obj) => {
    if(!productImage.some(o => o.image == obj.image)) {
      masterImageDestroy.push(obj.image)
    }
  })
  
  await repository.product.updateProduct(product, productImage, masterImageTaken, masterImageDestroy, (err) => {
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
