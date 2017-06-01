let protectedInstance;

/**
 * Represents a generic validator
 */
class GenericValidator {

  constructor({schemaValidator}) {

    /** @static {Function} Validates data against a schema */
    GenericValidator.schemaValidator = schemaValidator;
  }

  /**
   * Validates data against a schema.
   * @param {Object} payload The data to validate.
   * @param {Object} schema The schema to validate against.
   * @returns {boolean} The result of the schema validation if that's true.
   */
  schemaValidation(payload, schema) {

    let validate;

    console.log("GenericValidator.schemaValidation()//Validating payload: ", payload);
    validate = GenericValidator.schemaValidator(schema);

    if (validate(payload)) {
      return true;
    }
    throw validate.errors;
  }

}

function getGenericValidatorInstance(...args) {

  protectedInstance = protectedInstance || new GenericValidator(...args);

  return protectedInstance;
}

module.exports = exports = getGenericValidatorInstance;
exports.GenericValidator = GenericValidator;
