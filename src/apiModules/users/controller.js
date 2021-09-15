module.exports = {
  getUser: async (req, res, next) => {
    const {query} = req;
    res.json({data: 'users get', query});
  },

  getUserList: (req, res, next) => {
    const {params} = req;
    res.json({data: 'users get id', params});
  },

  createUser: (req, res, next) => {
    const {params, query, body} = req;
    res.json({data: 'users post', params, query, body});
  },

  updateUser: (req, res, next) => {
    const {params, query, body} = req;
    res.json({data: 'users put', params, query, body});
  },

  modifyUser: (req, res, next) => {
    const {params, query, body} = req;
    res.json({data: 'users patch', params, query, body});
  },

  deleteUser: (req, res, next) => {
    const {params, query, body} = req;
    res.json({data: 'users delete', params, query, body});
  },
};
