"use strict";

var _require = require("chai"),
    expect = _require.expect,
    _require2 = require("../../../dist/generic/GenericRepository"),
    GenericRepository = _require2.GenericRepository;

describe("The generic repository unit tests -->", function () {
	describe("The generic repository constructor", function () {
		describe("when it's been executed with valid config", function () {

			it("should have initialized all instance properties succssfully", function (done) {
				var validConfig = {
					"mongoDb": {
						"connectionString": "mongodb://foo",
						"operationTimeout": 1000,
						"connectionOptions": {},
						"promiseTimeout": 1000
					}
				},
				    genericRepo = new GenericRepository(validConfig);

				expect(genericRepo).to.have.property("connectionString_");
				expect(genericRepo).to.have.property("connectionOptions_");
				expect(genericRepo).to.have.property("operationTimeout_");
				expect(genericRepo).to.have.property("commonWriteConcern_");
				expect(genericRepo).to.have.property("promiseTimeout_");
				expect(genericRepo).to.have.property("dbConnection_");
				done();
			});
		});

		describe("when it's been executed with invalid config", function () {

			it("should throw an config error", function (done) {
				var inValidConfig = {
					"mongoDb": {}
				};

				function init() {
					return new GenericRepository(inValidConfig);
				}

				expect(init).to.throw(Error, "MongoDB connection string not available");
				done();
			});
		});
	});
});
//# sourceMappingURL=GenericRepository.spec.js.map
