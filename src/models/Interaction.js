'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['favorite', 'comment', 'answer', 'choice']
    },
    text: {
        type: String
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    exercice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercice'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge'
    }
});

module.exports = mongoose.model('Interaction', schema);