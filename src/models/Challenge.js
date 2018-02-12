'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['descriptive', 'multipleChoice', 'text']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
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
    points: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Challenge', schema);