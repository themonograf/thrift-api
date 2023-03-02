const { Op } = require("sequelize");
const model = require("../model/index");
const helper = require("../../helper/helper");
const conn = require("../database/database")
const repository = {};

repository.getAllProductCatalog = async function (req, resellerId, callback) {
  try {
    queryCondition = {}
    if (req.query.keyword != "") {
      queryCondition.name = {
        [Op.like]: "%" + req.query.keyword + "%" 
      }
    }

    if (req.query.product_category_id) {
      queryCondition.productCategoryId = {
        [Op.eq]: req.query.product_category_id 
      }
    }

    var listProductId = []
    await model.order.findAll({
      attributes: ["productId"],
      where: {
        status:2,
      }
    }).then(function (order) {
      listProductId.push(...order.map(pOrder => pOrder.productId))
    });

    includeCondition = []

    includeCondition[0] = {model: model.productImage}
    if((req.user_id) && req.user_id > 0){
      if(req.query.type=="catalog"){
        await model.productItem.findAll({
          attributes: ["productId"],
          group: ["productId"],
          where: {
            resellerId: {[Op.eq]:req.user_id}
          }
        }).then(function (productItem) {
          listProductId.push(...productItem.map(pPrice => pPrice.productId))
        });
        
      }else if(req.query.type=="reseller"){
        includeCondition[1] = {model: model.productItem, where: {resellerId: req.user_id}, required: true}
      }else{
        includeCondition[1] = {model: model.productItem, where: {resellerId: req.user_id}, required: false}
      }
    }else{
      if (resellerId > 0) {
        includeCondition[1] = {model: model.productItem, where: {resellerId: resellerId, enable: true}}
      }
    }

    if(listProductId.length > 0){
      queryCondition.id = {
        [Op.notIn]: listProductId
      }
    }

    const offset = helper.getOffset(req.query.page, req.query.limit);
    
    const { count, rows } = await model.product.findAndCountAll({
      distinct: true,
      where: queryCondition,
      // offset: parseInt(req.query.page),
      offset,
      limit: parseInt(req.query.limit),
      order: [["name", "ASC"]],
      include: includeCondition,
      exclude: [{model: model.productItem, where: {resellerId: req.user_id}, required: true}]
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    console.log(error)
    return callback(error);
  }
};

repository.getProductByslug = async function (slug, resellerId, userId, callback) {
  try {
    includeCondition = []

    includeCondition[0] = {model: model.productImage}
    if((userId) && userId > 0){
      includeCondition[1] = {model: model.productItem, where: {resellerId: userId}, required: false}
    }else{
      if (resellerId > 0) {
        includeCondition[1] = {model: model.productItem, where: {resellerId: resellerId, enable: true}}
      }
    }

    var queryCondition = {}
    queryCondition.slug = {
        [Op.eq]: slug
    }

    await model.order.findAll({
      attributes: ["productId"],
      where: {
        status:2,
      }
    }).then(function (order) {
      const productIds = order.map(pOrder => pOrder.productId)
      queryCondition.id = {
        [Op.notIn]: productIds
      }
    });

    const data = await model.product.findOne({
      where : queryCondition,
      include: includeCondition,
    });
    return callback(null, data);
  } catch (error) {
    return callback(error);
  }
};

repository.getProductById = async function (productId, callback) {
  try {
    const data = await model.product.findByPk(productId, {
      include : [{model: model.productImage}]
    })
    return callback(null, data)
  } catch (error) {
    return callback(error)
  }
}

repository.createProduct = async function (product, dataProductImage, masterImage, callback) {
  const t = await conn.db.transaction()
  try {
    const newProduct = await model.product.create(product, {transaction:t})

    productImage = dataProductImage.map(({image, is_primary}) => ({image: image, isPrimary : is_primary, productId:newProduct.id}))
    
    await model.productImage.bulkCreate(productImage, {transaction:t});
    
    await model.masterImage.masterImage.update({isTaken: true}, {where : {image : {
      [Op.in]: masterImage
    }}}, {transaction:t});

    await t.commit();

    return callback(null);
  } catch (error) {
    await t.rollback();
    return callback(error.message);
  }
};

repository.updateProduct = async function (product, productImage, masterImageTaken, masterImageDestroy, callback) {
  const t = await conn.db.transaction()
  try {
    const newProduct = await model.product.update(product, {where: {id:product.id}}, {transaction:t})

    productImage.map(async (obj) => {
      let arr = {
        id: obj.id,
        image: obj.image,
        isPrimary: obj.is_primary,
        productId: product.id
      }

      await model.productImage.upsert(arr, {transaction:t})
    })

    await model.masterImage.masterImage.update({isTaken: true}, {where : {image : {
      [Op.in]: masterImageTaken
    }}}, {transaction:t});

    if(masterImageDestroy.length > 0){
      await model.masterImage.masterImage.update({isTaken: false}, {where : {image : {
        [Op.in]: masterImageDestroy
      }}}, {transaction:t});
    }

    await t.commit();

    return callback(null);
  } catch (error) {
    await t.rollback();
    return callback(error.message);
  }
};

repository.getAllProduct = async function (req, callback) {
  try {
    const { count, rows } = await model.product.findAndCountAll({
      where: {
        name: { [Op.like]: "%" + req.query.keyword + "%" },
      },
      offset: parseInt(req.query.page),
      limit: parseInt(req.query.limit),
      order: [["updatedAt", "DESC"]],
      include : [{model: model.productImage}],
    });

    return callback(null, { total: count, data: rows });
  } catch (error) {
    return callback(error);
  }
};

repository.deleteProduct = async function (id, masterImageDestroy, callback) {
  const t = await conn.db.transaction()
  try {
    await model.product.destroy({where: { id:id }}, {transaction:t});

    if(masterImageDestroy.length > 0){
      await model.masterImage.masterImage.update({isTaken: false}, {where : {image : {
        [Op.in]: masterImageDestroy
      }}}, {transaction:t});
    }

    await t.commit();

    return callback(null);
  } catch (error) {
    await t.rollback();
    return callback(error.message);
  }
};

module.exports = repository;
