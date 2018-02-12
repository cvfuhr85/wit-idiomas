'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    photo: {
        type: String
    },
    points: {
        type: Number,
        require: true,
        default: 0
    },
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Student', schema);