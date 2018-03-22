'use strict'

const mongoose = require('mongoose');
const Interaction = mongoose.model('Interaction');

exports.getFavorite = async (id) => {
    const res = await Interaction.find({
        type: 'favorite',
        student: id
    }, 'subject').populate('subject');
    return res;
}

exports.getCommentsBySubject = async (id) => {
    const res = await Interaction.find({
        type: 'comment',
        subject: id
    }, 'subject student text');
    return res;
}

exports.getAnswerByStudent = async (studentId) => {
    const res = await Interaction.find({
        type: 'answer',
        student: studentId
    }, 'type exercise challenge text');
    return res;
}

exports.getAnswer = async (exerciseId, studentId) => {
    const res = await Interaction.findOne({
        type: 'answer',
        exercise: exerciseId,
        student: studentId
    });
    return res;
}

exports.getAnswerByClass = async (classId, exerciseId) => {
    const res = await Interaction.find({
        type: 'answer',
        exercise: exerciseId,
        class: classId,
        corrected: false
    }, 'exercise student text')
    .populate('student', 'name')
    .populate('exercise', 'title description');                                                                    
    return res;
}

exports.getAnswersChallenge = async (challengeId) => {
    const res = await Interaction.find({
        type: 'answer',
        challenge: challengeId
    }, 'exercise student text');
    return res;
}

exports.getCorrectAnswer = async (exerciseId, studentId) => {
    const res = await Interaction.findOne({
        type: 'correct',
        exercise: exerciseId,
        student: studentId
    }, 'exercise student text');
    return res;
}


exports.create = async (data) => {
    let interaction = new Interaction(data);
    await interaction.save();
}

exports.corrected = async (id, data) => {
    await Interaction.findByIdAndUpdate(id, {
        $set: {
            corrected: data.corrected
        }
    });
    console.log(id + '    ' + data.corrected);
    
}

exports.delete = async (id) => {
    await Interaction.findOneAndRemove(id);
}