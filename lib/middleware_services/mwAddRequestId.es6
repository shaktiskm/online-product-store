const uuid = require("uuid"),
  UniqueIdService = require("../util/UniqueIdService"),
  log = require("../util/ApiLogger");

function mwAddRequestId(req, res, next) {
  log.info("mwAddRequestId()//Creating UniqueId for request");
  let uniqueIdServiceIns = new UniqueIdService(uuid);

  req.id = uniqueIdServiceIns.createUniqueId();
  next();
}

module.exports = mwAddRequestId;
