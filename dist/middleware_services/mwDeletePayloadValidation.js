"use strict";

var ApiError = require("../util/apiError");

function mwDeletePayloadValidation(req, res, next) {
  if (req.body !== null && Object.keys(req.body).length > 0) {

    console.log("mwDeletePayloadValidation()//Payload is not allowed for deletion");
    var apiErr = new ApiError(req.id, 400, "BadRequest", "Cannot have payload in delete request", "");

    return next(apiErr);
  }
  // Set body to undefined
  req.body = undefined;
  console.log("mwDeletePayloadValidation()//Payload validation passed for deletion, set to undefined");

  next();
}

module.exports = mwDeletePayloadValidation;
//# sourceMappingURL=mwDeletePayloadValidation.js.map
