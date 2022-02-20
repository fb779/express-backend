const {check} = require('express-validator');

const {validateResult} = require('../../../middleware');

const {getRoleByName} = require('../role.dao');

const roleValidateCreate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .bail()
        .custom(async (value) => {
            const role = await getRoleByName(value);
            if (role) {
                return Promise.reject('Role already exist');
            }
        }),
    validateResult,
];

const roleValidateUpdate = [
    check('name')
        .exists()
        .not()
        .isEmpty()
        .isString()
        .bail()
        .custom(async (value) => {
            const role = await getRoleByName(value);
            if (role) {
                return Promise.reject('Role already exist');
            }
        }),
    validateResult,
];

module.exports = {
    roleValidateCreate,
    roleValidateUpdate,
};
