"use strict";
var folderService = requireService("folder");
var fsErrors = requireErrors('filesystem');
var errs = require('restify-errors');

module.exports.getFolder = async function (req, res, next) {
    try {
        let targetFolder = await folderService.getFolder(req.params.path, req.userProfile);
        res.send({ "data": targetFolder.toJSON(), "_links": "" });
        return next();
    } catch (e) {
        if (e instanceof fsErrors.ResourceDoesNotExistError) {
            return next(new errs.NotFoundError(e));
        }
    }
}