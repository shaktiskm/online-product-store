"use strict";

var uuid = require("uuid"),
    UniqueIdService = require("../util/UniqueIdService"),
    log = require("../util/ApiLogger");

function mwAddRequestId(req, res, next) {
  log.info("mwAddRequestId()//Creating UniqueId for request");
  var uniqueIdServiceIns = new UniqueIdService(uuid);

  req.id = uniqueIdServiceIns.createUniqueId();
  next();
}

module.exports = mwAddRequestId;
//# sourceMappingURL=mwAddRequestId.js.map
