"use strict";
var mongoose = require('mongoose');
var userProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 1
    },
    rootFolder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' }
})

userProfileSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model('UserProfile', userProfileSchema);