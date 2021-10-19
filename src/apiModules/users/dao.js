const UserModel = require('./model');

const {pagination} = require('../../../config/config');

/** Definiciones */
const {DEFAULT_PAGE, DEFAULT_LIMIT} = pagination;

module.exports = {
  getUserByUsername: (username) => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await UserModel.findByUsername(username));
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
        resolve(await UserModel.findById(id));
      } catch (error) {
        reject(error);
      }
    });
  },

  getUserList: (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await UserModel.find().skip(parseInt(page)).limit(parseInt(limit));

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
        const {password, ...editUserInfo} = userDto;
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
        const query = {_id: id};

        const user = await UserModel.findOneAndRemove(query);

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
};
