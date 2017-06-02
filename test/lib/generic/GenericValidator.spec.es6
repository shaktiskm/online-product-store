const {expect} = require("chai"),
  {stub} = require("sinon"),
  {GenericValidator} = require("../../../dist/generic/GenericValidator");

function setupValidator(returns) {
  let validate = stub().returns(returns);

  validate.errors = [
    {
      "field": "data.pay",
      "message": "is the wrong type"
    }
  ];

  return validate;
}

describe("******** The generic validator unit tests ********", () => {
  describe("******** The generic validator constructor ********", () => {
    describe("******** when it's been executed ********", () => {

      it("should deploy a static member called \"schemaValidator\"", () => {
        expect(Boolean(GenericValidator.schemaValidator)).to.be.true;
        expect(GenericValidator.schemaValidator).to.be.a("function");
      });
    });
  });

  describe("******** when \"schemaValidation\" method of generic validator is called ********", () => {
    describe("******** when it's executed ********", () => {
      let validate,
        expectedError,
        genericValidator,
        payload = {"pay": "load"},
        jsonSchema = {
          "type": "object",
          "properties": {
            "pay": {
              "type": "integer"
            }
          }
        };

      it("should proxy to the json schema validator library", () => {
        validate = setupValidator(true);
        genericValidator = new GenericValidator({
          "schemaValidator": () => validate
        });

        genericValidator.schemaValidation(payload, jsonSchema);

        expect(validate.withArgs(payload).calledOnce).to.equal(true);
      });

      it("should throw validation error", () => {
        validate = setupValidator(false);
        genericValidator = new GenericValidator({
          "schemaValidator": () => validate
        });
        expectedError = [
          {
            "field": "data.pay",
            "message": "is the wrong type"
          }
        ];

        function wrapper() {
          genericValidator.schemaValidation(payload, jsonSchema);
        }

        expect(wrapper).to.throw(expectedError);
      });

    });
  });
});
