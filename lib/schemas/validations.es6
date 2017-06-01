let validations = {
  "idValidation": {
    "type": "string",
    "pattern": /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  },
  "notEmptyString": {
    "type": "string",
    "pattern": /[^ ]/
  },
  "boolean": {
    "type": "boolean"
  },
  "number": {
    "type": "number"
  },
  "nonNegativeInteger": {
    "type": "integer",
    "minimum": 0
  },
  "nonNegativeNumber": {
    "type": "number",
    "minimum": 0
  },
  "numberGreaterThanZero": {
    "type": "number",
    "minimum": 0,
    "exclusiveMinimum": true
  },
  "integer": {
    "type": "integer"
  },
  "currency": {
    "type": "string",
    "enum": [
      "INR",
      "Rs."
    ]
  }
};

module.exports = validations;
