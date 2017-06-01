"use strict";

var expect = require("chai").expect,
    request = require("superagent"),
    url = "http://localhost:8050/v1/healthcheck";

describe("******** Testing Express Http Endpoints ********", function () {

  describe("******** when GET /v1/healthcheck is called ********", function () {

    before(function () {
      require("../../dist/api");
    });

    after(function () {
      setTimeout(function () {
        process.exit(1);
      }, 5000);
    });

    it("should return statusCode 200 sucessfully", function (done) {

      request.get(url).end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.statusCode).to.equal(200);
        done();
      });
    });

    it("should return message 'OK' successfully", function (done) {

      request.get(url).end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.msg).to.equal("OK");
        done();
      });
    });
  });
});
//# sourceMappingURL=api.spec.js.map
