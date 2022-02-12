const {Router} = require('express');

const {userValidateCreate, userValidateUpdate, userValidateDelete} = require('./validators/user.validator');

const {mongooseValidateObjecID} = require('../../middleware/mongoose-validators.middleware');

const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./user.controller');

const {checkQueryFilters} = require('./middleware/filters.middleware');
const {checkPagination} = require('../../middleware/pagination.middleware');

const router = Router();

router.get('/', [checkPagination, checkQueryFilters], getUserList);

router.get('/:id', [mongooseValidateObjecID], getUser);

router.post('/', userValidateCreate, createUser);

router.put('/:id', [mongooseValidateObjecID, userValidateUpdate], updateUser);

router.delete('/:id', [userValidateDelete], deleteUser);

module.exports = router;
