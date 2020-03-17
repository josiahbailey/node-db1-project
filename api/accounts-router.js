const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .cathc(err => {
      res.status(500).json({ message: 'Unable to retreive accounts' })
    })
})

router.get('/:id', (req, res) => {
  db('accounts')
    .where('id', req.params.id)
    .then(account => {
      if (account) {
        res.send(200).json(account)
      } else {
        res.send(404).json({ message: 'Account not found' })
      }
    })
    .catch(err => {
      res.send(500).json({ message: 'Unable to retrieve account' })
    })
})

router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body, "id")
    .then(id => {
      res.status(201).json({ message: `Created new account, id ${id[0]}` })
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to create new account' })
    })
})

