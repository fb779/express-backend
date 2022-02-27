const UserModel = require('./user.model');

const {pagination} = require('../../../config/config');

/** Definiciones */
const {DEFAULT_PAGE, DEFAULT_LIMIT} = pagination;

module.exports = {
    getCount: (query = {}) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await UserModel.countDocuments(query));
            } catch (error) {
                reject(error);
            }
        });
    },

    getUserByEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await UserModel.findByEmail(email));
            } catch (error) {
                reject(error);
            }
        });
    },

    getUserById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await UserModel.findById(id).populate([{path: 'role', select: 'name'}]));
            } catch (error) {
                reject(error);
            }
        });
    },

    getUserList: (filters, {page, limit}) => {
        return new Promise(async (resolve, reject) => {
            try {
                const offset = limit * (page - 1);

                const data = await UserModel.find(filters).skip(offset).limit(limit);

                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    createUser: (userDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.create(userDto);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateUser: (id, userDto) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const user = await UserModel.findByIdAndUpdate(id, userDto, {...queryOptions, context: 'query'});
                // const {password, ...editUserInfo} = userDto;
                const {...editUserInfo} = userDto;
                const user = await UserModel.findByIdAndUpdate(id, editUserInfo, {new: true});

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const query = {_id: id};
                // const user = await UserModel.findOneAndRemove(query);
                const user = await UserModel.findByIdAndRemove(id);

                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    },
};
