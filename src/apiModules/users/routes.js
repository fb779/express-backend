const {Router} = require('express');

const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./controller');

const router = Router();

router.get('/', getUserList);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
