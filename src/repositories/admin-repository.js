'use strict'

const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

exports.create = async (data) => {
    let admin = new Admin(data);
    await admin.save();
}

exports.authenticate = async(data) => {
    let res = await Admin.findOne({
        email: data.email,
        password: data.password
    });
    
    return res;
}