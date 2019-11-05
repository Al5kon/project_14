const router = require('express').Router();

const { getUserById, createUser, findAllUsers } = require('../controllers/users');

router.get('/:_id', getUserById);
router.post('/', createUser);
router.get('/', findAllUsers);

module.exports = router;
