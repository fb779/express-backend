const {Router} = require('express');

const {login, siging, logout} = require('./auth.controller');
const {LoginValidate} = require('./validators/auth.validator');

const router = Router();

router.post('/login', LoginValidate, login);
// router.post('/signin', ()=>{});
// router.post('/logout', ()=>{});

module.exports = router;
