const {check, param} = require('express-validator');
const {validateObjectId} = require('../../../helpers/validate-mongoose-objectId');

const {validateResult} = require('../../../helpers/validateResult');
const {getUserByUsername, getUserByEmail, getUserById} = require('../dao');

const userValidateUpdate = [
  check('username')
    .exists()
    .not()
    .isEmpty()
    .isString()
    .bail()
    .custom(async (value, {req}) => {
      const {id} = req.params;
      const user = await getUserById(id);
      const username = await getUserByUsername(value);
      if (user.username != value && username) {
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
    .custom(async (value, {req}) => {
      const {id} = req.params;
      const user = await getUserById(id);
      const userByEmail = await getUserByEmail(value);
      if (user.email !== value && userByEmail) {
        return Promise.reject('Email already in use');
      }
    }),
  // check('password').not().exists().withMessage('Password is a invalid parameter'),
  // check('password').exists().not().isEmpty().isStrongPassword(),
  // check('password').exists().isStrongPassword().withMessage(`The password is insecure`),
  check('image').isString(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  userValidateUpdate,
};
