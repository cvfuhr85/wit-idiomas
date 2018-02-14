'use strict'

const mongoose = require('mongoose');
const Subject = mongoose.model('Subject');

exports.get = async () => {
    const res = await Subject.find({
        active: 'active'
    }, 'title link');
    return res;
}

exports.getById = async (id) => {
    const res = await Subject.findById(id, 'title link');
    return res;
}

exports.getByClass = async (id) => {
    const res = await Subject.find({
        classes: id,
        active: 'active'
    }, 'title link');
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
            link: data.link
        }
    });
}

exports.active = async (id, data) => {
    await Subject.findByIdAndUpdate(id, {
        $set: { active: data.active }
    });
}