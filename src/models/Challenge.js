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
        require: true
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
        require: true
    },
    duration: {
        type: number,
        require: true
    },
    active: {
        type: String,
        required: true,
        enum: ['active', 'deactivated'],
        default: 'active'
    }
});

module.exports = mongoose.model('Challenge', schema);