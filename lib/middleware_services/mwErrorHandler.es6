const log = require("../util/ApiLogger");

function mwErrorHandler(err, req, res, next) {

  if (err) {
    if (err.hasOwnProperty("name") && err.name === "ApiError") {
      log.error(`mwErrorHandler()//ApiError ------ ${err}`);
      res.status(err.statusCode).send(err);
    } else if (err instanceof Error) {
      log.error(`mwErrorHandler()//Unhandled Error------ ${err}`);
      res.status(500).send("Internal Server Error");
    }
  }
  next();
}

module.exports = mwErrorHandler;
