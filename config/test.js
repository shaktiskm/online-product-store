"use strict";

// eslint disable no-var

var environmentVariables = require("./environmentVariables"),
  config = {
    "http": {
      "protocol": "http",
      "domain": "127.0.0.1",
      "port": environmentVariables.STORE_PORT
    },
    "appName": "online-product-store",
    "logger": {
      "name": "online-product-store",
      "streams": [
        {
          "level": "error",
          "path": "/var/log/online-store-error.log"
        }
      ]
    },
    "mongoDb": {
      "connectionString": environmentVariables.STORE_MONGO_CONNECTION_STRING,
      "operationTimeout": 4000,
      "connectionOptions": {
        "server": {
          "poolSize": 5,
          "socketOptions": {
            "autoReconnect": true,
            "keepAlive": 0
          },
          "reconnectTries": 30,
          "reconnectInterval": 1000
        }
      },
      "promiseTimeout": 4500
    },
    "authorization": {
      "authorize": true
    },
    "environmentVariableChecker": {
      "isEnabled": false
    },
    "urlPrefix": "/v1",
    "secretKey": environmentVariables.STORE_SECRET_KEY
  };

module.exports = config;

// eslint enable no-var
