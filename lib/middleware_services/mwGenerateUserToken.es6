const JWT = require("../util/JWTImplementaion"),
  ApiError = require("../util/apiError"),
  log = require("../util/ApiLogger");

function mwGenerateUserToken(req, res, next) {
  let secret = req.app.get("secretKey"),
    jwtInstance = new JWT(secret),
    payload = req.body,
    payloadData,
    token,
    options = {
      "expiresIn": "10d"
    };

  if (!payload.userId) {
    log.error("mwAuthenticateRequest()//Unable to generate the token");
    return next(new ApiError(req.id, 400, "Bad Request", "Token Generation Failed because of userId", ""));
  }

  payloadData = {
    "userId": payload.userId
  };

  try {
    token = jwtInstance.sign(payloadData, options);

    log.info("mwAuthenticateRequest()//Authentication Token generated successfully", token);
    let successResponse = {
      "reqId": req.id,
      "token": token,
      "status": "success"
    };

    res.status(200).send(successResponse);

  } catch (err) {
    log.error("mwAuthenticateRequest()//Unable to generate the token", err);
    return next(new ApiError(req.id, 400, "Bad Request", "Token Generation Failed", ""));
  }
}

module.exports = mwGenerateUserToken;
