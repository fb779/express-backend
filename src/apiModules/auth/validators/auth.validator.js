const {check} = require('express-validator');

const {validateResult} = require('../../../middleware');

const LoginValidate = [
    check('email', 'Email is required').exists().not().isEmpty().trim().normalizeEmail().isEmail({}),
    check('password', 'Password is required').exists().not().isEmpty(),
    validateResult,
];

module.exports = {
    LoginValidate,
};
