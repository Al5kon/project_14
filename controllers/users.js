/* eslint-disable object-curly-newline */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

module.exports.createUser = router.post('/signup', (req, res) => {
  console.log(req.body);
  const { name, about, avatar, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

module.exports.login = router.post('/signin', (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 360000 * 24 * 7, httpOnly: true }).end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
});

module.exports.findAllUsers = router.get('/', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});
