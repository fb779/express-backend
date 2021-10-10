const {check} = require('express-validator');

const {validateResult} = require('../../../helpers/validateResult');
const {getUserByUsername, getUserByEmail} = require('../dao');

const userValidateCreate = [
  check('username')
    .exists()
    .not()
    .isEmpty()
    .isString()
    .bail()
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) {
        return Promise.reject('Username already in use');
      }
    }),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .trim()
    .normalizeEmail()
    .isEmail()
    .bail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        return Promise.reject('Email already in use');
      }
    }),
  check('password').exists().not().isEmpty().isStrongPassword().withMessage(`The password is insecure`),
  check('image').isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  userValidateCreate,
};
