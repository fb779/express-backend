const createError = require('http-errors');

const {getUserByEmail} = require('../users/user.dao');

const {isPasswordRigth} = require('../../helpers/password.helper');
const {generateJWT} = require('../../helpers/jwt.helper');

module.exports = {
    loginEmailPassword: async (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await getUserByEmail(email);

                // TODO: check user exist
                if (!user) {
                    return reject(createError(400, {message: 'User or Password was wrong - user'}));
                }

                // TODO: check user status trues
                if (!user.status) {
                    return reject(createError(400, {message: 'User or Password was wrong - status:false'}));
                }

                // TODO: compare password
                if (!isPasswordRigth(password, user.password)) {
                    return reject(createError(400, {message: 'User or Password was wrong - password'}));
                }

                // TODO: generate jwt
                const token = await generateJWT({uid: user.uid});

                return resolve({token});
            } catch (error) {
                return reject(error);
            }
        });
    },
};
