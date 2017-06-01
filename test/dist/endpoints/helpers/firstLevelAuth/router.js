"use strict";

var express = require("express"),
    all = require("./all"),
    router = express.Router(),
    rootRoute = router.route("/");

// Assigns middleware and endpoint handlers to root route
rootRoute.post(all);

rootRoute.get(all);

rootRoute.put(all);

rootRoute.delete(all);

module.exports = router;
//# sourceMappingURL=router.js.map
