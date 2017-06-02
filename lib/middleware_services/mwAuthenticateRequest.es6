const JWT = require("../util/JWTImplementaion"),
  ApiError = require("../util/apiError"),
  log = require("../util/ApiLogger");

function mwAuthenticateRequest(req, res, next) {

  let {NODE_ENV} = process.env,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../../config/" + nodeEnv)),
    secret = req.app.get("secretKey"),
    jwtInstance = new JWT(secret),
    tokenRegex = new RegExp("^(b|B)earer\\s"),
    token = req.header("Authorization");

  if (!config.authorization.authorize) {
    log.info("mwAuthenticateRequest()//Authentication is disabled by configuration...");
    return next();
  }

  if (!token || !tokenRegex.test(token)) {
    log.error("mwAuthenticateRequest()//Authentication credentials were missing or incorrect.");
    let err = new ApiError(req.id, 401, "Unauthorized", "Authentication credentials missing or incorrect", "");

    return next(err);
  }

  token = token.split(" ")[1];

  jwtInstance
    .verifyToken(token)
    .then(data => {
      log.info("mwAuthenticateRequest()//Authentication Token verification done successfully", data);
      req.user = data;
      return next();

    }, failure => {
      log.error("mwAuthenticateRequest()//Unable to verify the supplied token", failure);
      return next(new ApiError(req.id, 401, "Unauthorized", "Authentication credentials missing or incorrect", ""));
    });
}

module.exports = mwAuthenticateRequest;
