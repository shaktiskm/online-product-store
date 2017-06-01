"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require("mongodb"),
    MongoClient = _require.MongoClient,
    Q = require("q");

var protectedGenericRepoIns = void 0;

var GenericRepository = function () {
  function GenericRepository(config) {
    _classCallCheck(this, GenericRepository);

    if (!config || !config.mongoDb.connectionString) {
      throw new Error("MongoDB connection string not available");
    }

    /** @member {string} Connection string to database. */
    this.connectionString_ = config.mongoDb.connectionString;

    /** @member {Object} Options object to pass to the driver connect method. */
    this.connectionOptions_ = config.mongoDb.connectionOptions;

    /** @member {string} Operation timeout in ms. */
    this.operationTimeout_ = config.mongoDb.operationTimeout;

    /** @member {number} The default timeout for promises in ms */
    this.promiseTimeout_ = config.mongoDb.promiseTimeout;

    /** @member {Q.Promise} Promise which represents the db connection and resolves to the db controller object. */
    this.dbConnection_ = this.connectToDB();
  }

  /**
   * Create connection to the mongodb database.
   * @private
   * @returns {Q.Promise} A promise which resolves the connection to the mongodb client.
   */


  _createClass(GenericRepository, [{
    key: "connectToDB",
    value: function connectToDB() {
      console.log("Connecting to db with options: ", this.connectionString_);
      this.dbConnection_ = Q.ninvoke(MongoClient, "connect", this.connectionString_, this.connectionOptions_);
      return this.dbConnection_;
    }

    /**
     * function for creating the mongodb object.
     * @returns {object} mongodb object after creating the connection.
     */

  }, {
    key: "getMongoDBObject",
    value: function getMongoDBObject() {
      var _this = this;

      return this.dbConnection_.timeout(this.promiseTimeout_).catch(function (err) {
        console.error(" MongoDB connection is not available", err);
        return _this.connectToDB();
      }).then(function (dbConn) {
        return dbConn;
      });
    }

    /**
     *@param {object} query read query
     *@returns {object} returns promise for read query
     */

  }, {
    key: "readQuery",
    value: function readQuery(query) {

      return {
        "fields": query.fields || {},
        "limit": query.limit || 0,
        "skip": query.skip || 0,
        "sort": query.sort || {}
      };
    }

    /**
     *@param {string} collection collection to be used for query
     *@param {object} query query object which contains body(filter query), fields, limit, skip, sort fields
     *@returns {Q.Promise} returns promise for read query
     */

  }, {
    key: "read",
    value: function read(_ref) {
      var _this2 = this;

      var collection = _ref.collection,
          query = _ref.query;


      var options = [];

      options.push(query.body);
      options.push(this.readQuery(query));

      return this.getMongoDBObject().then(function (db) {
        return Q.npost(db.collection(collection), "find", options).timeout(_this2.promiseTimeout_).then(function (cursor) {
          return Q.ninvoke(cursor, "toArray").then(function (results) {
            return results;
          });
        });
      });
    }

    /**
     *@param {string} collection collection to be used for query
     *@param {object} pipeline pipeline to be used in aggregation
     *@returns {Q.Promise} returns promise for aggregation
     */

  }, {
    key: "aggregate",
    value: function aggregate(_ref2) {
      var collection = _ref2.collection,
          pipeline = _ref2.pipeline;


      return this.getMongoDBObject().then(function (db) {
        return Q.ninvoke(db.collection(collection), "aggregate", pipeline);
      });
    }

    /**
     *
     * @param {string} collection name.
     * @param {object} object to be inserted into the collections
     * @returns {Q.Promise} returns promise for insertion
     */

  }, {
    key: "insertOne",
    value: function insertOne(_ref3) {
      var collection = _ref3.collection,
          document = _ref3.document;

      return this.getMongoDBObject().then(function (db) {
        return Q.ninvoke(db.collection(collection), "insertOne", document);
      });
    }
  }, {
    key: "insert",
    value: function insert(_ref4) {
      var collection = _ref4.collection,
          documents = _ref4.documents;

      return this.getMongoDBObject().then(function (db) {
        return Q.ninvoke(db.collection(collection), "insert", documents);
      });
    }
  }, {
    key: "update",
    value: function update(_ref5) {
      var collection = _ref5.collection,
          query = _ref5.query,
          document = _ref5.document;

      return this.getMongoDBObject().then(function (db) {
        return Q.ninvoke(db.collection(collection), "updateOne", query, document);
      });
    }
  }, {
    key: "remove",
    value: function remove(_ref6) {
      var collection = _ref6.collection,
          document = _ref6.document;

      return this.getMongoDBObject().then(function (db) {
        return Q.ninvoke(db.collection(collection), "deleteOne", document);
      });
    }
  }]);

  return GenericRepository;
}();

function getGenericRepoIns(config) {
  protectedGenericRepoIns = protectedGenericRepoIns || new GenericRepository(config);
  return protectedGenericRepoIns;
}

module.exports = getGenericRepoIns;
//# sourceMappingURL=GenericRepository.js.map
