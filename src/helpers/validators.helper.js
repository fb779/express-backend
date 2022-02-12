const mongoose = require('mongoose');

const {getRoleById} = require('./../apiModules/roles/role.dao');
const {getUserByEmail, getUserById} = require('./../apiModules/users/user.dao');

module.exports = {
    isValidObjectId: (value) => {
        return mongoose.Types.ObjectId.isValid(value);
    },

    isRoleValid: async (value, {req}) => {
        const role = await getRoleById(value);
        if (!role) {
            return Promise.reject(`Invalid Role, It doesn't exist`);
        }
    },

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
