'use strict'

const mongoose = require('mongoose');
const Exercise = mongoose.model('Exercise');

exports.get = async () => {
    const res = await Exercise.find();
    return res;
}

exports.getById = async (id) => {
    const res = await Exercise.findById(id);
    return res;
}

exports.getByClass = async (id) => {
    const res = await Exercise.find({
        classes: id
    });
    return res;
}

exports.create = async (data) => {
    let exercise = new Exercise(data);
    await exercise.save();
}

exports.update = async (id, data) => {
    await Exercise.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            choices: data.choices,
            correctChoice: data.correctChoice,
            correctAnswer: data.correctAnswer,
            classes: data.classes,
            active: data.active
        }
    });
}