const {Router} = require('express');

const {userValidateCreate} = require('./validators/user-create.validator');
const {userValidateUpdate} = require('./validators/user-edit.validator');
const {mongooseValidateObjecID} = require('../../middleware/mongoose-validators.middleware');

const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./controller');

const router = Router();

router.get('/', getUserList);

router.get('/:id', [mongooseValidateObjecID], getUser);

router.post('/', userValidateCreate, createUser);

router.put('/:id', [mongooseValidateObjecID, userValidateUpdate], updateUser);

router.delete('/:id', [mongooseValidateObjecID], deleteUser);

module.exports = router;
