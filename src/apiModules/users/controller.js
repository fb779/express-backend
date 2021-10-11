const createError = require('http-errors');
const {getUserById, getUserList, createUser, updateUser, deleteUser} = require('./dao');

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const {id = null} = req.params;

      const data = await getUserById(id);

      if (!data) {
        throw createError(400);
        // return next(createError(404));
      }

      res.json({data});
    } catch (error) {
      next(error);
    }
  },

  getUserList: async (req, res, next) => {
    try {
      const {
        query,
        query: {page, limit},
      } = req;

      const data = await getUserList(page, limit);

      res.json({data, query});
    } catch (error) {
      next(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const {body} = req;

      const data = await createUser(body);

      res.json({data});
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const {
        params: {id},
        body,
      } = req;

      const data = await updateUser(id, body);

      if (!data) {
        throw createError(400);
      }

      res.json({data});
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {
        params: {id},
      } = req;

      const data = await deleteUser(id);

      if (!data) {
        throw createError(400);
      }

      res.json({data});
    } catch (error) {
      next(error);
    }
  },
};
