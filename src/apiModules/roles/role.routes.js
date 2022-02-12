const {Router} = require('express');

const {mongooseValidateObjecID} = require('../../middleware/mongoose-validators.middleware');

const {roleValidateCreate, roleValidateUpdate} = require('./validators/role.validator');

const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./role.controller');

const router = Router();

router.get('/', getUserList);

router.get('/:id', [mongooseValidateObjecID], getUser);

router.post('/', roleValidateCreate, createUser);

router.put('/:id', [mongooseValidateObjecID, roleValidateUpdate], updateUser);

router.delete('/:id', [mongooseValidateObjecID], deleteUser);

module.exports = router;
