"use strict";

function index(req, res) {
  var successResponse = [{
    "reqId": req.id,
    "status": "success"
  }];

  res.status(200).send(successResponse);
}

module.exports = index;
//# sourceMappingURL=all.js.map
