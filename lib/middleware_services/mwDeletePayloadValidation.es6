const ApiError = require("../util/apiError"),
  log = require("../util/ApiLogger");

function mwDeletePayloadValidation(req, res, next) {
  if ((req.body !== null) && (Object.keys(req.body).length > 0)) {

    log.error("mwDeletePayloadValidation()//Payload is not allowed for deletion");
    let apiErr = new ApiError(req.id, 400, "BadRequest", "Cannot have payload in delete request", "");

    return next(apiErr);

  }
  // Set body to undefined
  req.body = undefined;
  log.info("mwDeletePayloadValidation()//Payload validation passed for deletion, set to undefined");

  next();
}

module.exports = mwDeletePayloadValidation;
