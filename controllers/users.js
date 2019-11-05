/* eslint-disable object-curly-newline */
const router = require('express').Router();
const User = require('../models/user');

module.exports.getUserById = router.get('/:_id', (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Такого пользователя не существует' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

module.exports.createUser = router.post('/', (req, res) => {
  console.log(req.body);
  const { name, about, avatar, email, password } = req.body;
  User.create({ name, about, avatar, email, password })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

module.exports.findAllUsers = router.get('/', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});
