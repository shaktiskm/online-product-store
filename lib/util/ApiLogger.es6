const bunyan = require("bunyan");

let nodeEnv = process.env.NODE_ENV || "local",
  config = require("../../config/" + nodeEnv),
  loggerOptions = config.logger || {},
  log = bunyan.createLogger(loggerOptions);

module.exports = log;
