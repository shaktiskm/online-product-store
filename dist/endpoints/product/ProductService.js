"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiError = require("../../util/apiError"),
    documentSchema = require("../../schemas/document");

var protectedService = void 0;

var ProductService = function () {
  function ProductService(dbService, genericValidator, uniqueIdService) {
    _classCallCheck(this, ProductService);

    this._dbService = dbService;
    ProductService.UniqueIdService = uniqueIdService;
    ProductService.genericValidator = genericValidator;
    ProductService.collection = "products";
  }

  _createClass(ProductService, [{
    key: "retrieveProducts",
    value: function retrieveProducts(req, res, next) {
      var collection = ProductService.collection,
          query = {
        "body": {}
      };

      this._dbService.read({ collection: collection, query: query }).then(function (result) {
        console.log("retrieveProducts()//Successfully retrieved products");
        var successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, res, next);
      }).catch(function (err) {
        console.log("retrieveProducts()//Error in retrieving products", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "validateProductSchema",
    value: function validateProductSchema(payload, schema) {
      return ProductService.genericValidator.schemaValidation(payload, schema);
    }
  }, {
    key: "createProduct",
    value: function createProduct(req, res, next) {
      var collection = ProductService.collection,
          payload = req.body,
          uniqueId = ProductService.UniqueIdService.createUniqueId(),
          document = void 0;

      try {
        if (this.validateProductSchema(payload, documentSchema)) {

          document = Object.assign(payload, { "_id": uniqueId });
          this._dbService.insertOne({ collection: collection, document: document }).then(function (result) {
            var successResponse = {
              "reqId": req.id,
              "id": uniqueId,
              "status": "success"
            };

            if (result && result === 1) {
              console.log("createProduct()//Successfully created product in database");
              ProductService.successHandler(successResponse, res, next);
            } else {
              console.log("createProduct()//Error in creating product");
              ProductService.errorHandler(new Error("DBError"), req.id, next);
            }
          }).catch(function (err) {
            console.log("createProduct()//Error in creating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
        }
      } catch (err) {
        var apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

        console.log("createProduct()//Error in validating schema ...", err);
        return next(apiErr);
      }
    }
  }, {
    key: "retrieveProductById",
    value: function retrieveProductById(req, res, next) {
      var collection = ProductService.collection,
          productId = req.params.id,
          query = {
        "body": {
          "_id": productId
        }
      };

      this._dbService.read({ collection: collection, query: query }).then(function (result) {
        console.log("retrieveProductById()//Successfully retrieved product with id " + productId, result);
        var successResponse = {
          "reqId": req.id,
          "status": "success",
          "data": result
        };

        ProductService.successHandler(successResponse, res, next);
      }).catch(function (err) {
        console.log("retrieveProductById()//Error in retrieving product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "updateProductById",
    value: function updateProductById(req, res, next) {
      var collection = ProductService.collection,
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
          this._dbService.update({ collection: collection, query: query, document: document }).then(function (result) {
            var successResponse = {
              "reqId": req.id,
              "id": productId,
              "status": "success"
            };

            if (!result || result === 0) {
              var apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

              return next(apiErr);
            }
            console.log("updateProductById()//Successfully updated product of id " + productId);

            ProductService.successHandler(successResponse, res, next);
          }).catch(function (err) {
            console.log("updateProductById()//Error in updating product", err);
            ProductService.errorHandler(err, req.id, next);
          });
        }
      } catch (err) {
        var apiErr = new ApiError(req.id, 400, "ValidationError", "Bad Request", err);

        console.log("updateProductById()//Error in validating schema ...", err);
        return next(apiErr);
      }
    }
  }, {
    key: "deleteProductById",
    value: function deleteProductById(req, res, next) {
      var collection = ProductService.collection,
          productId = req.params.id,
          document = {
        "_id": productId
      };

      this._dbService.remove({ collection: collection, document: document }).then(function (result) {
        var successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        if (!result || result === 0) {
          var apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

          return next(apiErr);
        }
        console.log("deleteProductById()//Successfully removed product of id " + productId);

        ProductService.successHandler(successResponse, res, next);
      }).catch(function (err) {
        console.log("deleteProductById()//Error in removing product", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }, {
    key: "addOrRemoveProductQty",
    value: function addOrRemoveProductQty(req, res, next) {
      var collection = ProductService.collection,
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

      this._dbService.update({ collection: collection, query: query, document: document }).then(function (result) {
        var successResponse = {
          "reqId": req.id,
          "id": productId,
          "status": "success"
        };

        if (!result || result === 0) {
          var apiErr = new ApiError(req.id, 404, "NotFound", "Resource doesn't exist", "");

          return next(apiErr);
        }
        console.log("addOrRemoveProductQty()//Successfully updated product quantity of id " + productId);

        ProductService.successHandler(successResponse, res, next);
      }).catch(function (err) {
        console.log("addOrRemoveProductQty()//Error in updating product quantity", err);
        ProductService.errorHandler(err, req.id, next);
      });
    }
  }], [{
    key: "successHandler",
    value: function successHandler(data, res, next) {
      if (!data || Object.keys(data).length === 0) {
        return next(new ApiError(data.reqId, 404, "Not Found", "Resource does not exist", ""));
      }
      res.status(200).send(data);
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(err, reqId, next) {
      var apiErr = new ApiError(reqId, 500, "Error", "Internal Server Error", err);

      next(apiErr);
    }
  }]);

  return ProductService;
}();

function getServiceInstance(dbService, genericValidator, uniqueIdService) {
  protectedService = protectedService || new ProductService(dbService, genericValidator, uniqueIdService);
  return protectedService;
}

module.exports = exports = getServiceInstance;
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map
