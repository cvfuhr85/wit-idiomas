'use strict'

const repository = require('../repositories/subject-repository');
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
                title: req.body.title,
                type: req.body.type,
                link: req.body.link,
                classes: req.body.classes
            });
        res.status(201).send({ message: 'Aula cadastrada com sucesso' });
    } catch (e) { catchError(e, res); }
};

exports.update = async (req, res, next) => {
    if (!validatorContract(req.body, res)) {
        return;
    }

    try {
        await repository.update(req.params.id, {
            title: req.body.title,
            type: req.body.type,
            link: req.body.link,
            classes: req.body.classes
        });
        res.status(200).send({ message: 'Aula atualizada com sucesso' });
    } catch (e) { catchError(e, res); }
}

exports.active = async (req, res, next) => {
    try {
        await repository.active(req.params.id, { active: req.body.active });
        res.status(200).send({ message: 'Aula atualizada com sucesso' });
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
    contract.hasMinLen(data.title, 3, 'O titulo deve ter pelo menos 3 caracteres')
    contract.hasMaxLen(data.title, 30, 'O titulo deve ter no máximo 30 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return false;
    }

    return true;
}