const {getRoleById} = require('./../role.dao');

module.exports = {
    isRoleValid: async (value, {req}) => {
        const role = await getRoleById(value);
        if (!role) {
            return Promise.reject(`Invalid Role, It doesn't exist`);
        }
    },
};
