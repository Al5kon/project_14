const router = require('express').Router();

const { getUserById, findAllUsers } = require('../controllers/users');

router.get('/:_id', getUserById);
router.get('/', findAllUsers);

module.exports = router;
