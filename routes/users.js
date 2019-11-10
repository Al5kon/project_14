const routerUsers = require('express').Router();

const { getUserById, findAllUsers } = require('../controllers/users');

routerUsers.get('/:_id', getUserById);
routerUsers.get('/', findAllUsers);

module.exports = routerUsers;
