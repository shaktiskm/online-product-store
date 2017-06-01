"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jsonwebtoken = require("jsonwebtoken"),
    Q = require("q");

var JWTImplementaion = function () {
  function JWTImplementaion(secretKey) {
    _classCallCheck(this, JWTImplementaion);

    this.secretKey = secretKey;
  }

  _createClass(JWTImplementaion, [{
    key: "sign",
    value: function sign(payload, options) {

      var token = jsonwebtoken.sign(payload, this.secretKey, options);

      return token;
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      return Q.ninvoke(jsonwebtoken, "verify", token, this.secretKey);
    }
  }]);

  return JWTImplementaion;
}();

/*
JWT Sample Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvdmlkZXIiLCJ1c2VyaWQiOiI2Yzg0ZmI5MC0xMmM0LTExZTEtODQwZC03YjI1YzVlZTc3NWEiLCJpYXQiOjE0NjQxNzQwOTF9.r2J276yxVil4DYTk88ApmoW4aTZXrwuqzqazo9KXnRE
 */

module.exports = JWTImplementaion;
//# sourceMappingURL=JWTImplementaion.js.map
