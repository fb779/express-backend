const UserModel = require('./model');

const pagination = {DEFAULT_PAGE: 0, DEFAULT_LIMIT: 10};
const options = {new: true, runValidators: true};

const {DEFAULT_PAGE, DEFAULT_LIMIT} = pagination;

module.exports = {
  getUserList: async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
    return await UserModel.find({}).skip(page).limit(limit);
  },

  getUser: async (id) => {
    return await UserModel.findById(id);
  },

  createUser: (userDto) => {
    return new Promise(async (resolve, reject) => {
      try {
        // const {email, username} = userDto;
        // const query = {email, username};
        // const user = await UserModel.findOneAndUpdate(query, userDto, {...options, upsert: true});
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
        const query = {_id: id};

        const user = await UserModel.findOneAndUpdate(query, userDto, options);

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

        const user = await UserModel.deleteOne(query, {returnDocument: true});

        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
};
