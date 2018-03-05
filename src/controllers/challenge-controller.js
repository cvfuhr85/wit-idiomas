'use strict'

const repository = require('../repositories/challenge-repository');
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
                type: req.body.type,
                title: req.body.title,
                description: req.body.description,
                choices: req.body.choices,
                correctChoice: req.body.correctChoice,
                correctAnswer: req.body.correctAnswer,
                classes: req.body.classes,
                points: req.body.points,
                duration: req.body.duration
            });
        res.status(201).send({ message: 'Desafio cadastrado com sucesso' });
    } catch (e) { catchError(e, res); }
};

exports.update = async (req, res, next) => {
    if (!validatorContract(req.body, res)) {
        return;
    }

    try {
        await repository.update(req.params.id, {
            type: req.body.type,
            title: req.body.title,
            description: req.body.description,
            choices: req.body.choices,
            correctChoice: req.body.correctChoice,
            correctAnswer: req.body.correctAnswer,
            classes: req.body.classes,
            points: req.body.points,
            duration: req.body.duration,
            active: req.body.active
        });
        res.status(200).send({ message: 'Desafio atualizado com sucesso' });
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
    contract.hasMaxLen(data.title, 30, 'O titulo deve ter no máximo 30 caracteres'),
        contract.hasMinLen(data.description, 3, 'A descrição deve ter pelo menos 3 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return false;
    }

    return true;
}