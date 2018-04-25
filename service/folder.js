"use strict";
var mongoose = require('mongoose');
var Folder = mongoose.model('Folder');
var fsErrors = requireErrors('filesystem');

class FolderService {

    /**
     * Get a folder by path
     * path must be {1stLevelFolder}/{2ndLevelFolder}/{nthLevelFolder}
     * @param {string} path the path used to reach the folder.
     * @param {}
     */
    async getFolder(path, user) {
        let folders = path.split("/");
        let targetFolder = user.rootFolder;
        for (let index = 0; index < folders.length; index++) {
            let folderName = folders[index];
            if (folderName === "")
                continue;
            targetFolder = await Folder.findOne({ parent: targetFolder, name: folderName });
            if (!targetFolder)
                throw new fsErrors.ResourceDoesNotExistError("Can't reach " + path + " : " + folderName + " does not exist.");
        }
        return targetFolder;
    }
}

module.exports = new FolderService();