const {Router} = require('express');

const {getUser, getUserList, createUser, updateUser, modifyUser, deleteUser} = require('./controller');

const router = Router();

router.get('/', getUser);

router.get('/:id', getUserList);

router.post('/', createUser);

router.put('/:id', updateUser);

router.patch('/:id', modifyUser);

router.delete('/:id', deleteUser);

module.exports = router;
