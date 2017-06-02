"use strict";

var express = require("express"),
    getGenericRepoIns = require("../../generic/GenericRepository"),
    getServiceInstance = require("./ProductService"),
    uuid = require("uuid"),
    isMyJsonValid = require("is-my-json-valid"),
    getGenericValidatorInstance = require("../../generic/GenericValidator"),
    UniqueIdService = require("../../util/UniqueIdService"),
    mwDeletePayloadValidation = require("../../middleware_services/mwDeletePayloadValidation"),
    logger = require("../../util/ApiLogger");

var NODE_ENV = process.env.NODE_ENV,
    nodeEnv = NODE_ENV || "local",
    config = Object.freeze(require("../../../config/" + nodeEnv)),
    dbService = getGenericRepoIns(config, logger),
    uniqueIdServiceIns = new UniqueIdService(uuid),
    getGenericValidatorIns = getGenericValidatorInstance({ "schemaValidator": isMyJsonValid }),
    productServiceIns = getServiceInstance(dbService, getGenericValidatorIns, uniqueIdServiceIns, logger),
    router = express.Router(),
    rootRoute = router.route("/"),
    paramRoute = router.route("/:id"),
    paramAddRemoveQtyRoute = router.route("/:id/addRemoveQty");


rootRoute.get(productServiceIns.retrieveProducts.bind(productServiceIns));

rootRoute.post(productServiceIns.createProduct.bind(productServiceIns));

paramRoute.get(productServiceIns.retrieveProductById.bind(productServiceIns));

paramRoute.put(productServiceIns.updateProductById.bind(productServiceIns));

paramRoute.delete(mwDeletePayloadValidation).delete(productServiceIns.deleteProductById.bind(productServiceIns));

paramAddRemoveQtyRoute.patch(productServiceIns.addOrRemoveProductQty.bind(productServiceIns));

module.exports = router;
//# sourceMappingURL=index.js.map
