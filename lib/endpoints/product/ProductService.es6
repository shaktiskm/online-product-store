const ApiError = require("../../util/apiError"),
  documentSchema = require("../../schemas/document");

let protectedService;

class ProductService {

  constructor(dbService, genericValidator, uniqueIdService) {
    this._dbService = dbService;
    ProductService.UniqueIdService = uniqueIdService;
    ProductService.genericValidator = genericValidator;
    ProductService.collection = "products";
  }

  static successHandler(data, reqId, res, next) {
    if (!data || Object.keys(data).length === 0) {
      return next(new ApiError(reqId, 404, "Not Found", "Resource does not exist", ""));
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
        console.log("retrieveProducts()//Successfully retrieved products");
        let successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      })
      .catch(err => {
        console.log("retrieveProducts()//Error in retrieving products", err);
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
          .then(success => {
            console.log("createProduct()//Successfully created product with dbResult", success.result);
            let successResponse = {
              "reqId": req.id,
              "id": uniqueId,
              "status": "success"
            };

            ProductService.successHandler(successResponse, req.Id, res, next);
          })
          .catch(err => {
            console.log("createProduct()//Error in creating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
      }
    } catch (err) {
      let apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

      console.log("createProduct()//Error in validating schema ...", err);
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
        console.log(`retrieveProductById()//Successfully retrieved product with id ${productId}`, result);
        let successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      })
      .catch(err => {
        console.log("retrieveProductById()//Error in retrieving product", err);
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
            console.log(`updateProductById()//Successfully updated product with id ${productId} and dbResult modifiedCount`,
              result.modifiedCount);
            let successResponse = {
              "reqId": req.id,
              "id": productId,
              "status": "success"
            };

            ProductService.successHandler(successResponse, req.Id, res, next);
          })
          .catch(err => {
            console.log("updateProductById()//Error in updating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
      }
    } catch (err) {
      let apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

      console.log("updateProductById()//Error in validating schema ...", err);
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
        console.log(`deleteProductById()//Successfully removed product with id ${productId} and dbResult deletedCount`,
          result.deletedCount);
        let successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      })
      .catch(err => {
        console.log("deleteProductById()//Error in removing product", err);
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
        console.log(`addOrRemoveProductQty()//Successfully updated product quantity with id ${productId}`,
          result.modifiedCount);
        let successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        ProductService.successHandler(successResponse, req.Id, res, next);
      })
      .catch(err => {
        console.log("addOrRemoveProductQty()//Error in updating product quantity", err);
        ProductService.errorHandler(err, req.id, next);
      });
  }

}


function getServiceInstance(dbService, genericValidator, uniqueIdService) {
  protectedService = protectedService || new ProductService(dbService, genericValidator, uniqueIdService);
  return protectedService;
}

module.exports = getServiceInstance;
