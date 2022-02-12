const bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: (password) => {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    verifyPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    },
};
