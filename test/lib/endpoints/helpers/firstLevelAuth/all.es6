function index(req, res) {
  let successResponse = [{
    "reqId": req.id,
    "status": "success"
  }];

  res.status(200).send(successResponse);
}

module.exports = index;
