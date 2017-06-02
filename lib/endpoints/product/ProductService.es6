const ApiError = require("../../util/apiError"),
  documentSchema = require("../../schemas/document");

let protectedService;

class ProductService {

  constructor(dbService, genericValidator, uniqueIdService, logger) {
    this._dbService = dbService;
    this._logger = logger;
    ProductService.UniqueIdService = uniqueIdService;
    ProductService.genericValidator = genericValidator;
    ProductService.collection = "products";
  }

  static successHandler(data, res, next) {
    if (!data || Object.keys(data).length === 0) {
      return next(new ApiError(data.reqId, 404, "Not Found", "Resource does not exist", ""));
    }
    res.status(200).send(data);
  }

  static errorHandler(err, reqId, next) {
    let apiErr = new ApiError(reqId, 500, "Error", "Internal Server Error", err);

    next(apiErr);
  }

  retrieveProducts(req, res, next) {
    let collection = ProductService.collection,
      query = {
        "body": {}
      };

    this._dbService
      .read({collection, query})
      .then(result => {
        this._logger.info("retrieveProducts()//Successfully retrieved products");
        let successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, res, next);
      })
      .catch(err => {
        this._logger.error("retrieveProducts()//Error in retrieving products", err);
        ProductService.errorHandler(err, req.id, next);
      });
  }

  validateProductSchema(payload, schema) {
    return ProductService.genericValidator.schemaValidation(payload, schema);
  }

  createProduct(req, res, next) {
    let collection = ProductService.collection,
      payload = req.body,
      uniqueId = ProductService.UniqueIdService.createUniqueId(),
      document;

    try {
      if (this.validateProductSchema(payload, documentSchema)) {

        document = Object.assign(payload, {"_id": uniqueId});
        this._dbService
          .insertOne({collection, document})
          .then(result => {
            let successResponse = {
              "reqId": req.id,
              "id": uniqueId,
              "status": "success"
            };

            if (result && result === 1) {
              this._logger.info("createProduct()//Successfully created product in database");
              ProductService.successHandler(successResponse, res, next);
            } else {
              this._logger.info("createProduct()//Error in creating product");
              ProductService.errorHandler(new Error("DBError"), req.id, next);
            }
          })
          .catch(err => {
            this._logger.error("createProduct()//Error in creating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
      }
    } catch (err) {
      let apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

      this._logger.error("createProduct()//Error in validating schema ...", err);
      return next(apiErr);
    }
  }

  retrieveProductById(req, res, next) {
    let collection = ProductService.collection,
      productId = req.params.id,
      query = {
        "body": {
          "_id": productId
        }
      };

    this._dbService
      .read({collection, query})
      .then(result => {
        this._logger.info(`retrieveProductById()//Successfully retrieved product with id ${productId}`, result);
        let successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, res, next);
      })
      .catch(err => {
        this._logger.error("retrieveProductById()//Error in retrieving product", err);
        ProductService.errorHandler(err, req.id, next);
      });
  }

  updateProductById(req, res, next) {
    let collection = ProductService.collection,
      productId = req.params.id,
      payload = req.body,
      query = {
        "_id": productId
      },
      document = {
        "$set": payload
      };

    try {
      if (this.validateProductSchema(payload, documentSchema)) {
        this._dbService
          .update({collection, query, document})
          .then(result => {
            let successResponse = {
              "reqId": req.id,
              "id": productId,
              "status": "success"
            };

            if (!result || result === 0) {
              let apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

              return next(apiErr);
            }
            this._logger.info(`updateProductById()//Successfully updated product of id ${productId}`);

            ProductService.successHandler(successResponse, res, next);
          })
          .catch(err => {
            this._logger.error("updateProductById()//Error in updating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
      }
    } catch (err) {
      let apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

      this._logger.error("updateProductById()//Error in validating schema ...", err);
      return next(apiErr);
    }
  }

  deleteProductById(req, res, next) {
    let collection = ProductService.collection,
      productId = req.params.id,
      document = {
        "_id": productId
      };

    this._dbService
      .remove({collection, document})
      .then(result => {
        let successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        if (!result || result === 0) {
          let apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

          return next(apiErr);
        }
        this._logger.info(`deleteProductById()//Successfully removed product of id ${productId}`);

        ProductService.successHandler(successResponse, res, next);
      })
      .catch(err => {
        this._logger.error("deleteProductById()//Error in removing product", err);
        ProductService.errorHandler(err, req.id, next);
      });

  }

  addOrRemoveProductQty(req, res, next) {
    let collection = ProductService.collection,
      productId = req.params.id,
      payload = req.body,
      query = {
        "_id": productId
      },
      document = {
        "$inc": {
          "qty": payload.qty
        }
      };

    this._dbService
      .update({collection, query, document})
      .then(result => {
        let successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        if (!result || result === 0) {
          let apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

          return next(apiErr);
        }
        this._logger.info(`addOrRemoveProductQty()//Successfully updated product quantity of id ${productId}`);

        ProductService.successHandler(successResponse, res, next);
      })
      .catch(err => {
        this._logger.error("addOrRemoveProductQty()//Error in updating product quantity", err);
        ProductService.errorHandler(err, req.id, next);
      });
  }

}


function getServiceInstance(dbService, genericValidator, uniqueIdService, logger) {
  protectedService = protectedService || new ProductService(dbService, genericValidator, uniqueIdService, logger);
  return protectedService;
}

module.exports = exports = getServiceInstance;
exports.ProductService = ProductService;
