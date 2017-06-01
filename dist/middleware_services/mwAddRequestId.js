"use strict";

var uuid = require("uuid"),
    UniqueIdService = require("../util/UniqueIdService");

function mwAddRequestId(req, res, next) {
  console.log("mwAddRequestId()//Creating UniqueId for request");
  var uniqueIdServiceIns = new UniqueIdService(uuid);

  req.id = uniqueIdServiceIns.createUniqueId();
  next();
}

module.exports = mwAddRequestId;
//# sourceMappingURL=mwAddRequestId.js.map
