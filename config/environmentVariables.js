"use strict";

// eslint disable no-var

var environmentVariables = {
  "STORE_MONGO_CONNECTION_STRING": process.env.STORE_MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/online_store",
  "STORE_SECRET_KEY": process.env.STORE_SECRET_KEY || "45a3c06e-ab7e-4256-9e9c-da2ac168ef25",
  "STORE_PORT": process.env.PORT || 8050
};

module.exports = environmentVariables;

// eslint enable no-var
