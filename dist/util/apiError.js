"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a API error.
 * @class
 */
var ApiError = function (_Error) {
  _inherits(ApiError, _Error);

  /**
   * @constructor
   * @param {string} reqId The Unique Identifier for every request
   * @param {Number} statusCode the Http status code for JavaScript error.
   * @param {string} errorType The type of the error. Currently either "ValidationError" or "Error".
   * @param {string} messages belongs to error.
   * @param {Error} innerError The original native JavaScript error.
   */
  function ApiError(reqId, statusCode, errorType, messages, innerError) {
    _classCallCheck(this, ApiError);

    var _this = _possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this));

    _this.reqId = reqId;

    _this.statusCode = statusCode;

    /** @member {string} errorType The type of the error. Currently either "ValidationError" or "Error". */
    _this.errorType = errorType;

    _this.name = "ApiError";

    /** @member {string} messages Collection of error messages. */
    _this.messages = messages;

    /** @member {Error} innerError The original native JavaScript error. */
    _this.innerError = innerError;
    return _this;
  }

  return ApiError;
}(Error);

module.exports = ApiError;
//# sourceMappingURL=apiError.js.map
