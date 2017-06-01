const {expect} = require("chai"),
  {GenericRepository} = require("../../../dist/generic/GenericRepository");

describe("The generic repository unit tests -->", () => {
  describe("The generic repository constructor", () => {
    describe("when it's been executed with valid config", () => {

	    it("should have initialized all instance properties succssfully", done => {
		    let validConfig = {
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

	  describe("when it's been executed with invalid config", () => {

		  it("should throw an config error", done => {
			  let inValidConfig = {
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
