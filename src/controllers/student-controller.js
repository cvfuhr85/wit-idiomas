'use strict'

const repository = require('../repositories/student-repository');
const ValidationContract = require('../validators/fluent-validator');

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
        await repository
            .create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
        res.status(201).send({ message: 'Aluno cadastrado com sucesso' });
    } catch (e) { catchError(e, res); }
};

exports.update = async (req, res, next) => {
    if (!validatorContract(req.body, res)) {
        return;
    }

    try {
        await repository.update(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(200).send({ message: 'Aluno atualizado com sucesso' });
    } catch (e) { catchError(e, res); }
}

exports.active = async (req, res, next) => {
    try {
        await repository.active(req.params.id, { active: req.body.active });
        res.status(200).send({ message: 'Aluno atualizada com sucesso' });
    } catch (e) { catchError(e, res); }
}

exports.addPoints = async (req, res, next) => {
    try {
        await repository.addPoints(req.params.id, { points: req.body.points });
        res.status(200).send({ message: 'Pontos atualizados com sucesso' });
    } catch (e) { catchError(e, res); }
}

exports.addClass = async (req, res, next) => {
    try {
        await repository.addClass(req.params.id, { class: req.body.class });
        res.status(200).send({ message: 'Aluno adicionado a turma com sucesso' });
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