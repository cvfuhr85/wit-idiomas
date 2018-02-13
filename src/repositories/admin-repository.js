'use strict'

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

exports.create = async (data) => {
    let admin = new Admin(data);
    await admin.save();
}