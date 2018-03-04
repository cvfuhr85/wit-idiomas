'use strict'

const mongoose = require('mongoose');
const Class = mongoose.model('Class');

exports.get = async () => {
    const res = await Class.find();
    return res;
}

exports.create = async (data) => {
    let newClass = new Class(data);
    await newClass.save();
}

exports.update = async (id, data) => {
    await Class.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            schedule: data.schedule,
            daysOfWeek: data.daysOfWeek,
            active: data.active
        }
    });
}