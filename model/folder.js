"use strict";
var mongoose = require('mongoose');
var folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
})

folderSchema.options.toJSON = {
    transform: function (doc, ret, options) {
        delete ret.__v;
        return ret;
    }
};

module.exports = mongoose.model('Folder', folderSchema);