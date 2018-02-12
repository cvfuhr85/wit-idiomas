'use strict'

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

exports.create = (data) => {
    let admin = new Admin(data);

    return admin.save();
}