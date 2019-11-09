// const router = require('express').Router();
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// const User = require('../models/user');

// router.post(cookieParser);

module.exports = ((req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, 'some-key');
    console.log(payload);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  console.log('авторизация');

  return next();
});
