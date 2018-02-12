'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        require: true
    },
    schedule: {
        type: String,
        require: true,
        unique: true
    },
    daysOfWeek: {
        type: String,
        require: true
    },
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Class', schema);