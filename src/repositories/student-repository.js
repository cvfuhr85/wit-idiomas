'use strict'

const mongoose = require('mongoose');
const Student = mongoose.model('Student');

exports.get = async () => {
    const res = await Student.find();
    return res;
}

exports.getById = async (id) => {
    const res = await Student.findById(id);
    return res;
}

exports.getByClass = async (id) => {
    const res = await Student.find({
        classes: id,
    });
    return res;
}

exports.create = async (data) => {
    let student = new Student(data);
    await student.save();
    return student;
}

exports.update = async (id, data) => {
    await Student.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            classes: data.classes,
            active: data.active
        }
    });
}

exports.authenticate = async(data) => {
    let res = await Student.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}