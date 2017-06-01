"use strict";

var environment = process.env.NODE_ENV || "local",
    config = require("../../../config/" + environment);

function urlProvider(path) {
  return "http://localhost:8050" + config.urlPrefix + path;
}

module.exports = urlProvider;
//# sourceMappingURL=urlProvider.js.map
