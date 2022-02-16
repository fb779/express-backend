const {response} = require('express');
const {loginEmailPassword} = require('./auth.dao');

module.exports = {
    login: async (req, res = response, next) => {
        try {
            const {email, password} = req.body;

            const data = await loginEmailPassword(email, password);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    siging: async (req, res, next) => {},

    logout: async (req, res, next) => {},
};
