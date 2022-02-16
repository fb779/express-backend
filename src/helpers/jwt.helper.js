const jwt = require('jsonwebtoken');

const {
    secret: {jwtKey, expireTime},
} = require('../../config/config');

module.exports = {
    generateJWT: async (payload = {}) => {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(payload, jwtKey, {expiresIn: expireTime});

                return resolve(token);
            } catch (error) {
                return reject(error);
            }
        });
    },
};
