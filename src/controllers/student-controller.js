'use strict'

const repository = require('../repositories/student-repository');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5');
const azure = require('azure-storage');
const config = require('../config');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getByClass = async (req, res, next) => {
    try {
        let data = await repository.getByClass(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.create = async (req, res, next) => {
    if (!validatorContract(req.body, res)) {
        return;
    }

    try {
        let student = await repository
            .create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY),
                roles: ['user'],
                photo: 'https://witteststorage.blob.core.windows.net/student-images/default-student.png'
            });

        let token = await authService.generateToken({
            id: student._id,
            email: student.email,
            name: student.name,
            roles: student.roles
        });


        res.status(201).send({
            token: token,
            data: {
                name: student.name,
                email: student.email,
                classes: student.classes,
                _id: student._id
            }
        });

    } catch (e) { catchError(e, res); }
};

exports.authenticate = async (req, res, next) => {
    try {
        console.log("1");

        let student = await repository
            .authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });

        if (!student) {
            res.status(404).send({ message: 'Usuário ou senha inválidos.' });
        }

        let token = await authService.generateToken({
            id: student._id,
            email: student.email,
            name: student.name,
            roles: student.roles
        });


        res.status(201).send({
            token: token,
            data: {
                name: student.name,
                email: student.email,
                classes: student.classes,
                _id: student._id
            }
        });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao realizar o login.' });
    }

};

exports.update = async (req, res, next) => {
    if (!validatorContractUpdate(req.body, res)) {
        return;
    }
    try {
        await repository.update(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            classes: req.body.classes,
            active: req.body.active,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(200).send({ message: 'Aluno atualizado com sucesso' });
    } catch (e) { catchError(e, res); }
}

exports.uploadPhoto = async (req, res, next) => {
    try {

        const blobService = azure.createBlobService(config.containerConnectionString);

        let fileName = guid.raw().toString() + '.jpg';
        let rawData = req.body.photo;
        let type = 'data:image/jpeg;base64,';
        let buffer = new Buffer(rawData, 'base64');

        await blobService.createBlockBlobFromText('student-images', fileName, buffer, {
            contentType: type
        }, function (error, result, response) {
            if (error) {
                fileName = 'default-student.png'
            }
        });

        let student = await repository.uploadPhoto(req.params.id, {
            photo: 'https://witteststorage.blob.core.windows.net/student-images/' + fileName
        });

        res.status(202).send(student.photo);

    } catch (e) { catchError(e, res); }
}

function catchError(e, res) {

    res.status(500).send({
        message: 'Falha ao processar requisição',
        error: e
    });
}

function validatorContract(data, res) {
    let contract = new ValidationContract();
    contract.hasMinLen(data.name, 3, 'O nome deve ter pelo menos 3 caracteres')
    contract.isEmail(data.email, 'E-mail invalido')
    contract.hasMinLen(data.password, 6, 'A senha deve ter pelo menos 6 caracteres')
    contract.isEqual(data.password, data.confirmPassword, 'As senhas não conferem')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return false;
    }

    return true;
}

function validatorContractUpdate(data, res) {
    let contract = new ValidationContract();
    contract.hasMinLen(data.name, 3, 'O nome deve ter pelo menos 3 caracteres')
    contract.isEmail(data.email, 'E-mail invalido')
    contract.hasMinLen(data.password, 6, 'A senha deve ter pelo menos 6 caracteres')
    contract.isEqual(data.password, data.confirmPassword, 'As senhas não conferem')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return false;
    }

    return true;
}








    // const blobService = azure.createBlobService(config.containerConnectionString);

    // let fileName = guid.raw().toString() + '.jpg';
    // let rawData = req.body.photo;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new Buffer(matches[2], 'base64');

    // await blobService.createBlockBlobFromText('student-images', fileName, buffer, {
    //     contentType: type
    // }, function (error, result, response) {
    //     if (error) {
    //         fileName = 'default-student.png'
    //     }
    // });

    // photo: 'https://witteststorage.blob.core.windows.net/student-images/' + fileName
