"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protectedInstance = void 0;

/**
 * Represents a generic validator
 */

var GenericValidator = function () {
  function GenericValidator(_ref) {
    var schemaValidator = _ref.schemaValidator;

    _classCallCheck(this, GenericValidator);

    /** @static {Function} Validates data against a schema */
    GenericValidator.schemaValidator = schemaValidator;
  }

  /**
   * Validates data against a schema.
   * @param {Object} payload The data to validate.
   * @param {Object} schema The schema to validate against.
   * @returns {boolean} The result of the schema validation if that's true.
   */


  _createClass(GenericValidator, [{
    key: "schemaValidation",
    value: function schemaValidation(payload, schema) {

      var validate = void 0;

      console.log("GenericValidator.schemaValidation()//Validating payload: ", payload);
      validate = GenericValidator.schemaValidator(schema);

      if (validate(payload)) {
        return true;
      }
      throw validate.errors;
    }
  }]);

  return GenericValidator;
}();

function getGenericValidatorInstance() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  protectedInstance = protectedInstance || new (Function.prototype.bind.apply(GenericValidator, [null].concat(args)))();

  return protectedInstance;
}

module.exports = getGenericValidatorInstance;
//# sourceMappingURL=GenericValidator.js.map
