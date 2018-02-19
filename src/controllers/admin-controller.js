'use strict'

// const mongoose = require('mongoose');
// const Admin = mongoose.model('Admin');
const repository = require('../repositories/admin-repository');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5');
const authService = require('../services/auth-service');

exports.create = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'E-mail invalido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve ter pelo menos 6 caracteres')
    contract.isEqual(req.body.password, req.body.confirmPassword, 'As senhas não conferem')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository
            .create({
                name: req.body.name,
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });
        res.status(201).send({ message: 'Administrador cadastrado com sucesso' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar requisição' });
    }

};

exports.authenticate = async (req, res, next) => {
    try {
        let admin = await repository
            .authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });
        
        if (!admin){
            res.status(404).send({ message: 'Usuário ou senha inválidos.' });
        }
        
        let token = await authService.generateToken({
            email: admin.email,
            name: admin.name
        });


        res.status(201).send({ 
            token: token,
            data: {
                name: admin.name,
                email: admin.email
            }
        });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar requisição' });
    }

};