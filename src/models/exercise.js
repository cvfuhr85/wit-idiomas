'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['Descritiva', 'Multipla']
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    choices: [{
        type: String,
    }],
    correctChoice: {
        type: String
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