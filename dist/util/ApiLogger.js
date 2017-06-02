"use strict";

var bunyan = require("bunyan");

var nodeEnv = process.env.NODE_ENV || "local",
    config = require("../../config/" + nodeEnv),
    loggerOptions = config.logger || {},
    log = bunyan.createLogger(loggerOptions);

module.exports = log;
//# sourceMappingURL=ApiLogger.js.map
