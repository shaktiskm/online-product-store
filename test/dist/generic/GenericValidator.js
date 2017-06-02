"use strict";

var _require = require("chai"),
    expect = _require.expect,
    _require2 = require("sinon"),
    stub = _require2.stub,
    _require3 = require("../../../dist/generic/GenericValidator"),
    GenericValidator = _require3.GenericValidator;

function setupValidator(returns) {
  var validate = stub().returns(returns);

  validate.errors = [{
    "field": "data.pay",
    "message": "is the wrong type"
  }];

  return validate;
}

describe("******** The generic validator unit tests ********", function () {
  describe("******** The generic validator constructor ********", function () {
    describe("******** when it's been executed ********", function () {

      it("should deploy a static member called \"schemaValidator\"", function () {
        expect(Boolean(GenericValidator.schemaValidator)).to.be.true;
        expect(GenericValidator.schemaValidator).to.be.a("function");
      });
    });
  });

  describe("******** when \"schemaValidation\" method of generic validator is called ********", function () {
    describe("******** when it's executed ********", function () {
      var validate = void 0,
          expectedError = void 0,
          genericValidator = void 0,
          payload = { "pay": "load" },
          jsonSchema = {
        "type": "object",
        "properties": {
          "pay": {
            "type": "integer"
          }
        }
      };

      it("should proxy to the json schema validator library", function () {
        validate = setupValidator(true);
        genericValidator = new GenericValidator({
          "schemaValidator": function schemaValidator() {
            return validate;
          }
        });

        genericValidator.schemaValidation(payload, jsonSchema);

        expect(validate.withArgs(payload).calledOnce).to.equal(true);
      });

      it("should throw validation error", function () {
        validate = setupValidator(false);
        genericValidator = new GenericValidator({
          "schemaValidator": function schemaValidator() {
            return validate;
          }
        });
        expectedError = [{
          "field": "data.pay",
          "message": "is the wrong type"
        }];

        function wrapper() {
          genericValidator.schemaValidation(payload, jsonSchema);
        }

        expect(wrapper).to.throw(expectedError);
      });
    });
  });
});
//# sourceMappingURL=GenericValidator.js.map
