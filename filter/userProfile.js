"use strict";
var userProfileService = requireService("userProfile")

module.exports = async (req, res, next) => {
    let userProfile = await userProfileService.get(req.user, {populateRootFolder: true});
    if (!userProfile) {
        userProfile = await userProfileService.create(req.user);
    }
    req.userProfile = userProfile;
    return next();
}
