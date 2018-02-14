'use strict'

const mongoose = require('mongoose');
const Challenge = mongoose.model('Challenge');

exports.get = async () => {
    const res = await Challenge.find({
        active: 'active'
    }, 'type title description correctChoice correctAnswer classes points duration');
    return res;
}

exports.getById = async (id) => {
    const res = await Challenge.findById(id, 'type title description correctChoice correctAnswer classes points duration');
    return res;
}

exports.getByClass = async (id) => {
    const res = await Challenge.find({
        classes: id,
        active: 'active'
    }, 'type title description correctChoice correctAnswer classes points duration');
    return res;
}

exports.create = async (data) => {
    let challenge = new Challenge(data);
    await challenge.save();
}

exports.update = async (id, data) => {
    await Challenge.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            choices: data.choices,
            correctChoice: data.correctChoice,
            correctAnswer: data.correctAnswer,
            classes: data.classes,
            points: data.points,
            duration: data.duration
        }
    });
}

exports.active = async (id, data) => {
    await Challenge.findByIdAndUpdate(id, {
        $set: { active: data.active }
    });
}