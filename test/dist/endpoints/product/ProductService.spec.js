"use strict";

var _require = require("chai"),
    expect = _require.expect,
    _require2 = require("sinon"),
    stub = _require2.stub,
    spy = _require2.spy,
    Q = require("q"),
    _require3 = require("../../../../dist/endpoints/product/ProductService"),
    ProductService = _require3.ProductService;

function getGenericRepositoryMock() {
  return {
    "insertOne": spy(function () {
      return Q.resolve(1);
    }),
    "update": spy(function () {
      return Q.resolve(1);
    }),
    "remove": spy(function () {
      return Q.resolve(1);
    }),
    "read": spy(function () {
      return Q.resolve("data");
    })
  };
}

function getGenericValidatorMock() {
  return {
    "schemaValidation": stub().returns(true)
  };
}

function getUniqueIdServiceMock(uniqueIdMock) {
  return {
    createUniqueId: function createUniqueId() {
      return uniqueIdMock || "dc953b12-3c22-11e5-a151-feff819cdc9f";
    }
  };
}

function getLoggerMock() {
  return {
    info: function info() {},
    error: function error() {},
    debug: function debug() {},
    trace: function trace() {},
    warn: function warn() {},
    fatel: function fatel() {}
  };
}

function getService(dbService, genericValidator, uniqueIdService, logger) {
  var dbServiceMock = dbService || getGenericRepositoryMock(),
      genericValidatorMock = genericValidator || getGenericValidatorMock(),
      uniqueIdServiceMock = uniqueIdService || getUniqueIdServiceMock(),
      loggerMock = logger || getLoggerMock();

  return new ProductService(dbServiceMock, genericValidatorMock, uniqueIdServiceMock, loggerMock);
}

function MockedResponse() {
  var _this = this;

  this.statusCode = 0;
  this.status = function (code) {
    _this.statusCode = code;
    return {
      send: function send() {}
    };
  };
}

function MockedNext() {
  var _this2 = this;

  this.errorObject = {};
  this.next = function (error) {
    _this2.errorObject = error;
  };
}

describe("******** The product service unit tests ********", function () {
  describe("******** The product service constructor ********", function () {
    describe("******** when it's executed ********", function () {
      it("should initialize some static members", function () {
        expect(Boolean(ProductService.UniqueIdService)).to.be.true;
        expect(Boolean(ProductService.genericValidator)).to.be.true;
        expect(Boolean(ProductService.collection)).to.be.true;
        expect(ProductService.errorHandler).to.be.a("function");
        expect(ProductService.successHandler).to.be.a("function");
      });

      it("should initialize some instance members", function () {
        var service = getService();

        expect(service).to.have.a.property("_dbService");
      });
    });
  });

  describe("******** when \"retrieveProducts\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      req = { "id": "1234" };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute read method of dbService", function () {
      service.retrieveProducts(req, res, nextInstance.next);
      expect(service._dbService.read.calledOnce).to.be.true;
    });
  });

  describe("******** when \"createProduct\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      stub(service, "validateProductSchema").returns(true);
      req = {
        "id": "1234",
        "body": {}
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute insertOne method of dbService", function () {
      service.createProduct(req, res, nextInstance.next);
      expect(service._dbService.insertOne.calledOnce).to.be.true;
    });
  });

  describe("******** when \"retrieveProductById\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      req = {
        "id": "1234",
        "params": {
          "id": "3456"
        }
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute read method of dbService", function () {
      service.retrieveProductById(req, res, nextInstance.next);
      expect(service._dbService.read.calledOnce).to.be.true;
    });
  });

  describe("******** when \"updateProductById\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      stub(service, "validateProductSchema").returns(true);
      req = {
        "id": "1234",
        "body": {},
        "params": {
          "id": "3456"
        }
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute update method of dbService", function () {
      service.updateProductById(req, res, nextInstance.next);
      expect(service._dbService.update.calledOnce).to.be.true;
    });
  });

  describe("******** when \"deleteProductById\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      req = {
        "id": "1234",
        "params": {
          "id": "3456"
        }
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute remove method of dbService", function () {
      service.deleteProductById(req, res, nextInstance.next);
      expect(service._dbService.remove.calledOnce).to.be.true;
    });
  });

  describe("******** when \"addOrRemoveProductQty\" method of product service is called ********", function () {
    var service = void 0,
        req = void 0,
        res = void 0,
        nextInstance = void 0;

    beforeEach(function () {
      service = getService();
      req = {
        "id": "1234",
        "body": {},
        "params": {
          "id": "3456"
        }
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute update method of dbService", function () {
      service.addOrRemoveProductQty(req, res, nextInstance.next);
      expect(service._dbService.update.calledOnce).to.be.true;
    });
  });
});
//# sourceMappingURL=ProductService.spec.js.map
