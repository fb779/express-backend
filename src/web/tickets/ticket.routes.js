const {Router} = require('express');

const {home} = require('./ticket.controller');

const router = new Router();

router.get('', home);

module.exports = router;
