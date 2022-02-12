const {check} = require('express-validator');

const {isRoleValid, emailExist, userExist} = require('../../../helpers/validators.helper');

const {validateResult} = require('../../../middleware/validateResult');

const {getUserById, getUserByEmail} = require('../user.dao');

const userValidateCreate = [
    check('first_name').exists().not().isEmpty().isString().bail(),
    check('last_name').exists().not().isEmpty().isString().bail(),
    check('email').exists().not().isEmpty().trim().normalizeEmail().isEmail().bail().custom(emailExist),
    check('password').exists().not().isEmpty().isStrongPassword().withMessage(`The password is insecure`),
    check('role').exists().not().isEmpty().bail().custom(isRoleValid),
    validateResult,
];

const userValidateUpdate = [
    check('id', `Invalid Id`).isMongoId().bail().custom(userExist).bail(),
    check('first_name').exists().not().isEmpty().isString().bail(),
    check('last_name').exists().not().isEmpty().isString().bail(),
    check('email')
        .exists()
        .not()
        .isEmpty()
        .trim()
        .normalizeEmail()
        .isEmail()
        .bail()
        .custom(async (value, {req}) => {
            // BUG: verificar carga del usuario por middleware de autenticacion JWT.
            // FIX: validar si el email es diferente del actual y que no exista.
            const {id} = req.params;

            const user = await getUserById(id);
            const userByEmail = await getUserByEmail(value);

            if (value !== user.email && userByEmail) {
                return Promise.reject('Email already in use');
            }
        }),
    check('password').optional().not().isEmpty().isStrongPassword().withMessage(`The password is insecure`),
    check('role').exists().not().isEmpty().bail().custom(isRoleValid),
    validateResult,
];

const userValidateDelete = [check('id', `Invalid Id`).isMongoId().bail().custom(userExist).bail(), validateResult];

module.exports = {
    userValidateCreate,
    userValidateUpdate,
    userValidateDelete,
};
