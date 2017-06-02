"use strict";

var express = require("express"),
    bodyparser = require("body-parser"),
    methodOverride = require("method-override"),
    checkEnvironmentVariables = require("./util/checkEnvironmentVariables"),
    ApiError = require("./util/apiError"),
    mwAllowCrossDomain = require("./middleware_services/mwAllowCrossDomain"),
    mwAuthenticateRequest = require("./middleware_services/mwAuthenticateRequest"),
    mwErrorHandler = require("./middleware_services/mwErrorHandler"),
    mwAddRequestId = require("./middleware_services/mwAddRequestId"),
    mwGenerateUserToken = require("./middleware_services/mwGenerateUserToken"),
    productRouter = require("./endpoints/product");

var NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../config/" + nodeEnv)),
    urlPrefix = config.urlPrefix,
    app = express(),
    environmentVariables = require("../config/environmentVariables"),
    firstLevelAuthTest = nodeEnv === "local" ? require("../test/dist/endpoints/helpers/firstLevelAuth/router") : null;

// Checks the required enviro// Defines top middleware and routesnment variables
// Logs the missing environment variables and exit the application
if (config.environmentVariableChecker.isEnabled) {
  checkEnvironmentVariables(environmentVariables);
}

// set the relevant config app wise
app.set("port", config.http.port);
app.set("secretKey", config.secretKey);

// Don't generate X-Powered-By response header
app.disable("x-powered-by");

app.use(mwAllowCrossDomain);
app.use(bodyparser.json());

// HealthCheck Endpoint --> GET ...v1/healthcheck
app.get(urlPrefix + "/healthcheck", function (req, res) {
  res.send({ "msg": "OK" });
});

// App routes here
app.use(mwAddRequestId);

// JWT Authentication Implemented -- Generate Token
app.post("/generateToken", mwGenerateUserToken);

// JWT Authentication Implemented -- Verify Token & User
app.use(mwAuthenticateRequest);

// Simple Product Add, Delete, Edit, Search Routes
app.use("/products", productRouter);

if (nodeEnv === "local") {
  app.use(urlPrefix + "/first-level-auth-test", firstLevelAuthTest);
}

function notFoundHandler(req, res, next) {
  var apiError = new ApiError("NotFound", "Resource doesn't exist", "", 404);

  return next(apiError);
}

app.use(notFoundHandler);

app.use(methodOverride);
app.use(mwErrorHandler);

app.listen(app.get("port"), function () {
  console.log("Server is listening on port --> " + app.get("port"));
});

module.exports = app;
//# sourceMappingURL=api.js.map
