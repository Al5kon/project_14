/* eslint-disable quotes */
/* eslint-disable quote-props */
const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');

const mongoose = require('mongoose');

const router = require('./routes/users.js');

const { login, createUser } = require('./controllers/users');

const routerCards = require('./routes/cards.js');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => console.log('Hi'))
  .catch((e) => console.log(e));

app.use('/cards', (req, res, next) => {
  req.user = {
    _id: '5db32846fa0a50463eb2acf0',
  };
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.post('/users', bodyParser.json(), router);
app.post('/cards', bodyParser.json(), routerCards);
app.use('/users', router);
app.post('/signin', bodyParser.json(), login);
app.post('/signup', bodyParser.json(), createUser);
app.use('/cards', routerCards);
app.use((req, res) => {
  res.status(404).json({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
