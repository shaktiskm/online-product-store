const jsonwebtoken = require("jsonwebtoken"),
  Q = require("q");

class JWTImplementaion {

  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  sign(payload, options) {

    let token = jsonwebtoken.sign(payload, this.secretKey, options);

    return token;
  }

  verifyToken(token) {
    return Q.ninvoke(jsonwebtoken, "verify", token, this.secretKey);
  }
}

/*
JWT Sample Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicHJvdmlkZXIiLCJ1c2VyaWQiOiI2Yzg0ZmI5MC0xMmM0LTExZTEtODQwZC03YjI1YzVlZTc3NWEiLCJpYXQiOjE0NjQxNzQwOTF9.r2J276yxVil4DYTk88ApmoW4aTZXrwuqzqazo9KXnRE
 */

module.exports = JWTImplementaion;
