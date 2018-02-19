'use strict'

const repository = require('../repositories/user-repository');
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
                password: md5(req.body.password + global.SALT_KEY),
                roles: ['admin']
            });
        res.status(201).send({ message: 'Usuário cadastrado com sucesso' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar requisição' });
    }

};

exports.authenticate = async (req, res, next) => {
    try {
        let user = await repository
            .authenticate({
                email: req.body.email,
                password: md5(req.body.password + global.SALT_KEY)
            });
        
        if (!user){
            res.status(404).send({ message: 'Usuário ou senha inválidos.' });
        }

        let token = await authService.generateToken({
            id: user._id,
            email: user.email,
            name: user.name,
            roles: user.roles
        });


        res.status(201).send({ 
            token: token,
            data: {
                name: user.name,
                email: user.email
            }
        });

    } catch (e) {
        res.status(500).send({ message: 'Falha ao processar requisição' });
    }

};