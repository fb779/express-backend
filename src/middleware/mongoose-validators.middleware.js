const createError = require('http-errors');

const {isValidObjectId} = require('../helpers/validators.helper');

module.exports = {
    mongooseValidateObjecID: (req, res, next) => {
        const {id} = req.params;

        if (!isValidObjectId(id)) {
            throw createError(400, `The Id: ${id} is invalid`);
            // return res.status(404).json({message: `El recurso no fue encontrado`});
        }

        next();
    },
};
