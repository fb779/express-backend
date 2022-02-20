const {getUserByEmail, getUserById} = require('../user.dao');

module.exports = {
    emailExist: async (email) => {
        const user = await getUserByEmail(email);
        if (user) {
            return Promise.reject('Email already in use');
        }
    },

    userExist: async (id) => {
        const user = await getUserById(id);
        if (!user) {
            return Promise.reject(`Id ${id} doesn't exist`);
        }
    },
};
