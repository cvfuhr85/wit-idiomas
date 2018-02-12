'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['descriptive', 'multipleChoice']
    },
    title: {
        type: String,
        require: true
    },
    correctChoice: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E']
    },
    correctAnswer: {
        type: String
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    }],
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Exercise', schema);