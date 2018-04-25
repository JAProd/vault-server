"use strict";

var folderController = requireController('folder');

module.exports = function (server) {

    server.get('/hello/:name', function (req, res, next) { res.send({ "t": "u" }); return next(); });

    server.get({ path: "/folder/:path(.*)", version: "1.0.0" }, folderController.getFolder)
}