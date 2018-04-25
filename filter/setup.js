"use strict";
module.exports.preAuthenticationFilters = [
]

module.exports.postAuthenticationFilters = [
    require("./userProfile")
]