const {response} = require('express');
const {loginEmailPassword, signInGoolgeAccount} = require('./auth.dao');

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

    googleSignIn: async (req, res, next) => {
        try {
            const {id_token} = req.body;

            const token = await signInGoolgeAccount(id_token);

            res.json({
                token,
            });
        } catch (error) {
            next(error);
        }
    },

    // siging: async (req, res, next) => {},

    // logout: async (req, res, next) => {},
};
