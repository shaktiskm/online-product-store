"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protectedUniqueIDService = void 0;

var UniqueIdService = function () {
  function UniqueIdService(uuid) {
    _classCallCheck(this, UniqueIdService);

    UniqueIdService.uuidLib = uuid;
  }

  /**
   * Creates a time based unique id.
   * @param {options} options The options of the creation
   * @returns {string} The created unique id.
   */


  _createClass(UniqueIdService, [{
    key: "createUniqueId",
    value: function createUniqueId(options) {
      return UniqueIdService.uuidLib.v1(options);
    }
  }]);

  return UniqueIdService;
}();

function getUniqueIdServiceInstance(uuid) {

  protectedUniqueIDService = protectedUniqueIDService || new UniqueIdService(uuid);

  return protectedUniqueIDService;
}

module.exports = getUniqueIdServiceInstance;
//# sourceMappingURL=UniqueIdService.js.map
