const {getUser, getUserList, createUser, updateUser, deleteUser} = require('./dao');

module.exports = {
  getUser: async (req, res, next) => {
    const {id = null} = req.params;

    const data = await getUser(id);

    res.json({data, message: 'users get'});
  },

  getUserList: async (req, res, next) => {
    const {query = {}} = req;
    console.log('algo apra saber si llegamos aqui carajo ', query);
    const data = await getUserList(query);

    res.json({data, message: 'users get id'});
  },

  createUser: async (req, res, next) => {
    try {
      const {params, query, body} = req;

      const data = await createUser(body);

      res.json({data, params, query, body});
    } catch (error) {
      console.log(error);
      res.json({ok: false, error});
    }
  },

  updateUser: async (req, res, next) => {
    const {params, query, body} = req;

    const user = await updateUser(body);

    res.json({data: 'users put', params, query, body});
  },

  modifyUser: async (req, res, next) => {
    const {params, query, body} = req;

    const user = await updateUser(body);

    res.json({data: 'users patch', params, query, body});
  },

  deleteUser: async (req, res, next) => {
    const {params, query, body} = req;

    const user = await deleteUser(body);

    res.json({data: 'users delete', params, query, body});
  },
};
