"use strict";
var mongoose = require('mongoose');
var UserProfile = mongoose.model('UserProfile');
var Folder = mongoose.model('Folder');

class UserProfileService {

    /**
     * get the profile corresponding to a user. contains app-specific user information
     * @param {user} user the user extracted from the token jwt.
     * @param {array} options list of options to modify the request.
     * @param {boolean} options.populateRootFolder if true, populates the rootFolder attribute.
     * @returns {userProfile} the profile corresponding to the given user
     */
    async get(user, options) {
        //return await UserProfile.findOne({ "userId": user.sub });
        let u = UserProfile.findOne({ "userId": user.sub });
        if (options && options.populateRootFolder)
            u.populate("rootFolder");
        return await u;
    }

    /**
     * create the profile corresponding to a user. contains app-specific user information
     * @param {user} user the user extracted from the token jwt
     * @returns {userProfile} the profile corresponding to the given user
     */
    async create(user) {
        //create the user root folder
        let rootFolder = await Folder.create({ "name": "root", "parent": null });
        let userProfile = {
            "userId": user.sub,
            "rootFolder": rootFolder
        }
        return await UserProfile.create(userProfile);
    }
}

module.exports = new UserProfileService();