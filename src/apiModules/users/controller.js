const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./dao');

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const {id = null} = req.params;

      const data = await getUser(id);

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
        throw new Error(`Record ${id} is't found`);
        // return res.status(400).json({ok: false, error: `Record ${id} is't found`});
      }

      res.json({data});
    } catch (error) {
      next(error);
    }
  },
};
