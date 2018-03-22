'use strict'

const repository = require('../repositories/interaction-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.getFavorite = async (req, res, next) => {
    try {
        let data = await repository.getFavorite(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getCommentsBySubject = async (req, res, next) => {
    try {
        let data = await repository.getCommentsBySubject(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getAnswerByStudent = async (req, res, next) => {
    try {
        let data = await repository.getAnswerByStudent(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getAnswer = async (req, res, next) => {
    try {
        let data = await repository.getAnswer(req.params.exerciseId, req.params.studentId);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getAnswerByClass = async (req, res, next) => {
    try {
        let data = await repository.getAnswerByClass(req.params.classId, req.params.exerciseId);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getAnswersChallenge = async (req, res, next) => {
    try {
        let data = await repository.getAnswersChallenge(req.params.id);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.getCorrectAnswer = async (req, res, next) => {
    try {
        let data = await repository.getCorrectAnswer(req.params.exerciseId, req.params.studentId);
        res.status(200).send(data);
    } catch (e) { catchError(e, res); }
}

exports.create = async (req, res, next) => {
    try {
        await repository
            .create({
                type: req.body.type,
                text: req.body.text,
                student: req.body.student,
                class: req.body.course,
                exercise: req.body.exercise,
                subject: req.body.subject,
                challenge: req.body.challenge
            });
        res.status(201).send({ message: 'Interação cadastrada com sucesso' });
    } catch (e) { catchError(e, res); }
};

exports.corrected = async (req, res, next) => {
    try {
        console.log('1');
        await repository.corrected(req.params.id, {
            corrected: req.body.corrected
        });
        res.status(200).send({ message: 'Exercicio corrigido' });
    } catch (e) { catchError(e, res); }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({ message: 'Interação excluída com sucesso' });
    } catch (e) { catchError(e, res); }
};

function catchError(e, res) {
    res.status(500).send({
        message: 'Falha ao processar requisição',
        error: e
    });
}