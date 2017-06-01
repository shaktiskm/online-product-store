"use strict";

var validations = require("./validations");

var document = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "title": validations.notEmptyString,
    "description": validations.notEmptyString,
    "qty": validations.nonNegativeNumber,
    "price": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "currency": validations.currency,
        "rate": validations.numberGreaterThanZero
      },
      "required": ["currency", "rate"]
    }
  },
  "required": ["title", "qty", "price"]
};

module.exports = document;
//# sourceMappingURL=document.js.map
