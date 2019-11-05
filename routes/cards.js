const routerCards = require('express').Router();

const { getAllCards, postCard, deleteCardByCardId } = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', postCard);
routerCards.delete('/:cardId', deleteCardByCardId);

module.exports = routerCards;
