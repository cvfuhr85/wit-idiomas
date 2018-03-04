'use strict'

const repository = require('../repositories/class-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.create = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve ter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.schedule, 'Os horários devem ter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.daysOfWeek, 6, 'Os dias da semana devem ter pelo menos 3 caracteres')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository
            .create({
                name: req.body.name,
                schedule: req.body.schedule,
                daysOfWeek: req.body.daysOfWeek
            });
        res.status(201).send({ message: 'Turma cadastrado com sucesso' });
    } catch (e) { catchError(e, res); }
};

exports.update = async (req, res, next) => {
    try {
        await repository.update(req.params.id, {
            name: req.body.name,
            schedule: req.body.schedule,
            daysOfWeek: req.body.daysOfWeek,
            active: req.body.active
        });
        res.status(200).send({ message: 'Turma atualizada com sucesso' });
    } catch (e) { catchError(e, res); }
}

function catchError(e, res) {
    res.status(500).send({
        message: 'Falha ao processar requisição',
        error: e
    });
}