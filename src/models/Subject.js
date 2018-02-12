'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['pdf', 'video', 'audio']
    },
    link: {
        type: String,
        required: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }],
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Subject', schema);