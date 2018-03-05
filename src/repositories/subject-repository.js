'use strict'

const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');

exports.get = async () => {
    const res = await Subject.find();
    return res;
}

exports.getById = async (id) => {
    const res = await Subject.findById(id, 'title link');
    return res;
}

exports.getByClass = async (id) => {
    const res = await Subject.find({
        classes: id
    });
    return res;
}

exports.create = async (data) => {
    let subject = new Subject(data);
    await subject.save();
}

exports.update = async (id, data) => {
    await Subject.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            active: data.active
        }
    });
}