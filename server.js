'use strict'

const http = require('http');
const debug = require('debug')('witidiomas:server');
const express = require('express');

const app = express();
const port = 3000;
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

let route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Wit Idiomas API",
        version: "1.0.0"
    });
});

app.use('/', route);

server.listen(port);
console.log('API rodando na porta ' + port);