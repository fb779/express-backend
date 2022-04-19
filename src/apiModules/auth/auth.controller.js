const {response} = require('express');
const {loginEmailPassword, signInGoolgeAccount, renewToken} = require('./auth.dao');

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

            const data = await signInGoolgeAccount(id_token);

            res.json(data);
        } catch (error) {
            next(error);
        }
    },

    renewToken: async (req, res, next) => {
        try {
            const {user} = req;

            const token = await renewToken(user);

            res.json(Object.assign({}, {token, user}));
        } catch (error) {
            next(error);
        }
    },
};
