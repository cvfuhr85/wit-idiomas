'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['favorite', 'comment', 'answer', 'correct', 'incorrect']
    },
    text: {
        type: String
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    corrected: {
        type: Boolean,
        default: false
        
    }
});

module.exports = mongoose.model('Interaction', schema);