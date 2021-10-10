const createError = require('http-errors');

const {validateObjectId} = require('../helpers/validate-mongoose-objectId');

module.exports = {
  mongooseValidateObjecID: (req, res, next) => {
    const {id} = req.params;

    if (!validateObjectId(id)) {
      throw createError(400);
      // return res.status(404).json({message: `El recurso no fue encontrado`});
    }

    next();
  },
};
