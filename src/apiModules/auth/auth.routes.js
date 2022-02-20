const {Router} = require('express');

const {login, siging, logout, googleSignIn} = require('./auth.controller');
const {LoginValidate, GoogleLoginValidate} = require('./validators/auth.validator');

const router = Router();

router.post('/login', LoginValidate, login);
router.post('/google', GoogleLoginValidate, googleSignIn);
// router.post('/signin', ()=>{});
// router.post('/logout', ()=>{});

module.exports = router;
