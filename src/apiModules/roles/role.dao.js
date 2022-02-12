const RoleModel = require('./role.model');

const {pagination} = require('../../../config/config');

/** Definiciones */
const {DEFAULT_PAGE, DEFAULT_LIMIT} = pagination;

module.exports = {
    getRoleByName: (name) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await RoleModel.findByName(name));
            } catch (error) {
                reject(error);
            }
        });
    },

    getRoleById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await RoleModel.findById(id));
            } catch (error) {
                reject(error);
            }
        });
    },

    getRoleList: (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await RoleModel.find().skip(parseInt(page)).limit(parseInt(limit));

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    createRole: (roleDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await RoleModel.create(roleDto);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateRole: (id, roleDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const user = await RoleModel.findByIdAndUpdate(id, roleDto, {...queryOptions, context: 'query'});
                const user = await RoleModel.findByIdAndUpdate(id, roleDto, {new: true});

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteRole: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await RoleModel.findByIdAndRemove(id);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },
};
