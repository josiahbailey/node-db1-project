const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router()

router.get('/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to retreive accounts' })
    })
})

router.get('/:id', (req, res) => {
  db('accounts')
    .where('id', req.params.id)
    .then(account => {
      if (account) {
        console.log(account)
        res.status(200).json(account[0])
      } else {
        res.status(404).json({ message: 'Account not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to retrieve account' })
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

router.put('/:id', (req, res) => {
  db('accounts')
    .where('id', req.params.id)
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(203).json({ message: 'Account successfully updated' })
      } else {
        res.status(404).json({ messagee: 'Account not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to update account' })
    })
})

router.delete('/:id', (req, res) => {
  db('accounts')
    .where('id', req.params.id)
    .del()
    .then(count => {
      if (count > 0) {
        res.status(203).json({ message: 'Account successfully deleted' })
      } else {
        res.status(404).json({ messagee: 'Account not found' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Unable to delete account' })
    })
})

module.exports = router

