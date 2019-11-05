const router = require('express').Router();
const Card = require('../models/card');


module.exports.getAllCards = router.get('/', (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

module.exports.postCard = router.post('/', (req, res) => {
  const owner = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});

module.exports.deleteCardByCardId = router.delete('/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Такой карточки не существует' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
});
