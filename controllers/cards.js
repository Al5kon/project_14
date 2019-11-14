const Card = require('../models/card');
require('./users');

const getAllCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
};

const postCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err}` }));
};

const deleteCardByCardId = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            if (!card) {
              res.status(404).send({ message: 'Такой карточки не существует' });
              return;
            }
            res.send({ data: card });
          })
          .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err}` }));
      } else {
        res.status(403).send({ message: 'Это карта Вам не принадлежит' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getAllCards,
  postCard,
  deleteCardByCardId,
};
