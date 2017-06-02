const {expect} = require("chai"),
  {stub, spy} = require("sinon"),
  Q = require("q"),
  {ProductService} = require("../../../../dist/endpoints/product/ProductService");

function getGenericRepositoryMock() {
  return {
    "insertOne": spy(() => Q.resolve(1)),
    "update": spy(() => Q.resolve(1)),
    "remove": spy(() => Q.resolve(1)),
    "read": spy(() => Q.resolve("data"))
  };
}

function getGenericValidatorMock() {
  return {
    "schemaValidation": stub().returns(true)
  };
}

function getUniqueIdServiceMock(uniqueIdMock) {
  return {
    createUniqueId() {
      return uniqueIdMock || "dc953b12-3c22-11e5-a151-feff819cdc9f";
    }
  };
}

function getLoggerMock() {
  return {
    info() {},
    error() {},
    debug() {},
    trace() {},
    warn() {},
    fatel() {}
  };
}

function getService(dbService, genericValidator, uniqueIdService, logger) {
  let dbServiceMock = dbService || getGenericRepositoryMock(),
    genericValidatorMock = genericValidator || getGenericValidatorMock(),
    uniqueIdServiceMock = uniqueIdService || getUniqueIdServiceMock(),
    loggerMock = logger || getLoggerMock();

  return new ProductService(dbServiceMock, genericValidatorMock, uniqueIdServiceMock, loggerMock);
}

function MockedResponse() {
  this.statusCode = 0;
  this.status = code => {
    this.statusCode = code;
    return {
      send() {}
    };
  };
}

function MockedNext() {
  this.errorObject = {};
  this.next = error => {
    this.errorObject = error;
  };
}

describe("******** The product service unit tests ********", () => {
  describe("******** The product service constructor ********", () => {
    describe("******** when it's executed ********", () => {
      it("should initialize some static members", () => {
        expect(Boolean(ProductService.UniqueIdService)).to.be.true;
        expect(Boolean(ProductService.genericValidator)).to.be.true;
        expect(Boolean(ProductService.collection)).to.be.true;
        expect(ProductService.errorHandler).to.be.a("function");
        expect(ProductService.successHandler).to.be.a("function");
      });

      it("should initialize some instance members", () => {
        let service = getService();

        expect(service).to.have.a.property("_dbService");
      });
    });
  });

  describe("******** when \"retrieveProducts\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
      service = getService();
      req = {"id": "1234"};
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute read method of dbService", () => {
      service.retrieveProducts(req, res, nextInstance.next);
      expect(service._dbService.read.calledOnce).to.be.true;
    });
  });

  describe("******** when \"createProduct\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
      service = getService();
      stub(service, "validateProductSchema").returns(true);
      req = {
        "id": "1234",
        "body": {}
      };
      res = new MockedResponse();
      nextInstance = new MockedNext();
    });

    it("should execute insertOne method of dbService", () => {
      service.createProduct(req, res, nextInstance.next);
      expect(service._dbService.insertOne.calledOnce).to.be.true;
    });
  });

  describe("******** when \"retrieveProductById\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
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

    it("should execute read method of dbService", () => {
      service.retrieveProductById(req, res, nextInstance.next);
      expect(service._dbService.read.calledOnce).to.be.true;
    });
  });

  describe("******** when \"updateProductById\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
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

    it("should execute update method of dbService", () => {
      service.updateProductById(req, res, nextInstance.next);
      expect(service._dbService.update.calledOnce).to.be.true;
    });
  });

  describe("******** when \"deleteProductById\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
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

    it("should execute remove method of dbService", () => {
      service.deleteProductById(req, res, nextInstance.next);
      expect(service._dbService.remove.calledOnce).to.be.true;
    });
  });

  describe("******** when \"addOrRemoveProductQty\" method of product service is called ********", () => {
    let service,
      req,
      res,
      nextInstance;

    beforeEach(() => {
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

    it("should execute update method of dbService", () => {
      service.addOrRemoveProductQty(req, res, nextInstance.next);
      expect(service._dbService.update.calledOnce).to.be.true;
    });
  });
});
