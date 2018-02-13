'use strict'

const mongoose = require('mongoose');
const Student = mongoose.model('Student');

exports.get = async () => {
    const res = await Student.find({
        active: 'active'
    }, 'name email points');
    return res;
}

exports.getById = async (id) => {
    const res = await Student.findById(id, 'name email points');
    return res;
}

exports.getByClass = async (id) => {
    const res = await Student.find({
        class: id,
        active: 'active'
    }, 'name email');
    return res;
}

exports.create = async (data) => {
    let student = new Student(data);
    await student.save();
}

exports.update = async (id, data) => {
    await Student.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
}

exports.active = async (id, data) => {
    await Student.findByIdAndUpdate(id, {
        $set: { active: data.active }
    });
}

exports.addPoints = async (id, data) => {
    await Student.findByIdAndUpdate(id, {
        // $set: { points: points + data.points }
        // $inc: { points: data.points}
        $inc: { points: parseInt(data.points)}
    });
}

exports.addClass = async (id, data) => {
    await Student.findByIdAndUpdate(id, {
        // $set: { classes: classes + data.class }
        $push: {classes: data.class}
    });
}