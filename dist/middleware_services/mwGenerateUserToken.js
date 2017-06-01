"use strict";

var JWT = require("../util/JWTImplementaion"),
    ApiError = require("../util/apiError");

function mwGenerateUserToken(req, res, next) {
  var secret = req.app.get("secretKey"),
      jwtInstance = new JWT(secret),
      payload = req.body,
      payloadData = void 0,
      token = void 0,
      options = {
    "expiresIn": "10d"
  };

  if (!payload.userId) {
    console.error("mwAuthenticateRequest()//Unable to generate the token");
    return next(new ApiError(req.id, 400, "Bad Request", "Token Generation Failed because of userId", ""));
  }

  payloadData = {
    "userId": payload.userId
  };

  try {
    token = jwtInstance.sign(payloadData, options);

    console.log("mwAuthenticateRequest()//Authentication Token generated successfully", token);
    var successResponse = {
      "reqId": req.id,
      "token": token,
      "status": "success"
    };

    res.status(200).send(successResponse);
  } catch (err) {
    console.error("mwAuthenticateRequest()//Unable to generate the token", err);
    return next(new ApiError(req.id, 400, "Bad Request", "Token Generation Failed", ""));
  }
}

module.exports = mwGenerateUserToken;
//# sourceMappingURL=mwGenerateUserToken.js.map
