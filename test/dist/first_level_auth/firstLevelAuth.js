"use strict";

var request = require("superagent"),
    expect = require("chai").expect,
    urlProvider = require("../util/urlProvider"),
    url = urlProvider("/first-level-auth-test");

describe("******** The first level authentication ********", function () {

  describe("******** when valid token is present in request ********", function () {

    var validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzaGFrdGlza21AZ21haWwuY29tIiwiaWF0IjoxNDk2Mjk1NjgzLCJleHAiOjE0OTcxNTk2ODN9.iVLYUxWgjhBbB8SWhMjL7qtUmQrqaGK_WjjU4Xcqonk";

    it("should pass a post request", function (done) {

      request.post(url).send({ "foo": "bar" }).set("Authorization", "Bearer " + validToken).end(function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.an("array");
        done();
      });
    });

    it("should pass a put request", function (done) {

      request.put(url).send({ "foo": "bar" }).set("Authorization", "Bearer " + validToken).end(function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.an("array");
        done();
      });
    });

    it("should pass a get request", function (done) {

      request.get(url).set("Authorization", "Bearer " + validToken).end(function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.an("array");
        done();
      });
    });

    it("should pass a del request", function (done) {

      request.del(url).set("Authorization", "Bearer " + validToken).end(function (err, result) {
        if (err) {
          return done(err);
        }
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.an("array");
        done();
      });
    });
  });

  describe("******** when token is missing in request ********", function () {

    it("should fail the post request with statusCode 401", function (done) {
      request.post(url).send({ "foo": "bar" }).ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the put request with statusCode 401", function (done) {
      request.put(url).send({ "foo": "bar" }).ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the get request with statusCode 401", function (done) {
      request.get(url).ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the del request with statusCode 401", function (done) {
      request.del(url).ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });
  });

  describe("******** when invalid token is present in request ********", function () {

    it("should fail the post request with statusCode 401", function (done) {
      request.post(url).send({ "foo": "bar" }).set("Authorization", "Bearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the put request with statusCode 401", function (done) {
      request.put(url).send({ "foo": "bar" }).set("Authorization", "Bearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the get request with statusCode 401", function (done) {
      request.get(url).set("Authorization", "Bearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the del request with statusCode 401", function (done) {
      request.del(url).set("Authorization", "Bearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });
  });

  describe("******** when invalid value of authorization header is present ********", function () {

    it("should fail the post request with statusCode 401", function (done) {
      request.post(url).send({ "foo": "bar" }).set("Authorization", "InvalidBearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the put request with statusCode 401", function (done) {
      request.put(url).send({ "foo": "bar" }).set("Authorization", "InvalidBearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the get request with statusCode 401", function (done) {
      request.get(url).set("Authorization", "InvalidBearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });

    it("should fail the del request with statusCode 401", function (done) {
      request.del(url).set("Authorization", "InvalidBearer invalidToken").ok(function (res) {
        return res.status < 500;
      }).then(function (result) {
        expect(result.body.errorType).to.be.equal("Unauthorized");
        expect(result.body.statusCode).to.be.equal(401);
        expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
        done();
      });
    });
  });
});
//# sourceMappingURL=firstLevelAuth.js.map
