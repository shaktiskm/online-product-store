let request = require("superagent"),
  expect = require("chai").expect,
  urlProvider = require("../util/urlProvider"),
  url = urlProvider("/first-level-auth-test");

describe("******** The first level authentication ********", () => {

  describe("******** when valid token is present in request ********", () => {

    let validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJzaGFrdGlza21AZ21haWwuY29tIiwiaWF0IjoxNDk2Mjk1NjgzLCJleHAiOjE0OTcxNTk2ODN9.iVLYUxWgjhBbB8SWhMjL7qtUmQrqaGK_WjjU4Xcqonk";

    it("should pass a post request", done => {

      request
        .post(url)
        .send({"foo": "bar"})
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a put request", done => {

      request
        .put(url)
        .send({"foo": "bar"})
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a get request", done => {

      request
        .get(url)
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });

    it("should pass a del request", done => {

      request
        .del(url)
        .set("Authorization", `Bearer ${validToken}`)
        .end((err, result) => {
          if (err) {
            return done(err);
          }
          expect(result.status).to.be.equal(200);
          expect(result.body).to.be.an("array");
          done();
        });
    });
  });

  describe("******** when token is missing in request ********", () => {

    it("should fail the post request with statusCode 401", done => {
      request
        .post(url)
        .send({"foo": "bar"})
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the put request with statusCode 401", done => {
      request
        .put(url)
        .send({"foo": "bar"})
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the get request with statusCode 401", done => {
      request
        .get(url)
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the del request with statusCode 401", done => {
      request
        .del(url)
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });
  });

  describe("******** when invalid token is present in request ********", () => {

    it("should fail the post request with statusCode 401", done => {
      request
        .post(url)
        .send({"foo": "bar"})
        .set("Authorization", "Bearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the put request with statusCode 401", done => {
      request
        .put(url)
        .send({"foo": "bar"})
        .set("Authorization", "Bearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the get request with statusCode 401", done => {
      request
        .get(url)
        .set("Authorization", "Bearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the del request with statusCode 401", done => {
      request
        .del(url)
        .set("Authorization", "Bearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });
  });

  describe("******** when invalid value of authorization header is present ********", () => {

    it("should fail the post request with statusCode 401", done => {
      request
        .post(url)
        .send({"foo": "bar"})
        .set("Authorization", "InvalidBearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the put request with statusCode 401", done => {
      request
        .put(url)
        .send({"foo": "bar"})
        .set("Authorization", "InvalidBearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the get request with statusCode 401", done => {
      request
        .get(url)
        .set("Authorization", "InvalidBearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });

    it("should fail the del request with statusCode 401", done => {
      request
        .del(url)
        .set("Authorization", "InvalidBearer invalidToken")
        .ok(res => res.status < 500)
        .then(result => {
          expect(result.body.errorType).to.be.equal("Unauthorized");
          expect(result.body.statusCode).to.be.equal(401);
          expect(result.body.messages).to.deep.equal("Authentication credentials missing or incorrect");
          done();
        });
    });
  });
});
