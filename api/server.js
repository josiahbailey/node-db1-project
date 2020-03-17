const express = require("express");

const AccountsRouter = require('./accounts-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Practice Api</h1>`)
})

server.use('/api/accounts', AccountsRouter)

module.exports = server;
