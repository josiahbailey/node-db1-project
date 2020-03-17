const express = require("express");

const accounts = require('./accounts-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Practice Api</h1>`)
})

server.use('/api/accounts', accounts)

module.exports = server;
