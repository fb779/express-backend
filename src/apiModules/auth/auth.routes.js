const {Router} = require('express');

const {validateJWT} = require('../../middleware');
const {LoginValidate, GoogleLoginValidate} = require('./validators/auth.validator');
const {login, googleSignIn, renewToken} = require('./auth.controller');

const router = Router();

router.post('/login', LoginValidate, login);
router.post('/google', GoogleLoginValidate, googleSignIn);
router.get('', validateJWT, renewToken);
// router.post('/signin', ()=>{});
// router.post('/logout', ()=>{});

module.exports = router;
