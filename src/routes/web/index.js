const {Router} = require('express');

const {
    server: {titleApp},
    google: {client_id},
} = require('../../../config/config');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: titleApp});
});

router.get('/generic', (req, res) => {
    res.render('generic', {title: titleApp});
});

router.get('/elements', (req, res) => {
    res.render('elements', {title: titleApp});
});

router.get('/chat', (req, res) => {
    const title = 'Socket Examle';
    const scripts = ['chat-socket.js'];
    res.render('socket', {title, scripts});
});

router.get('/google-sign-in', (req, res) => {
    res.render('google', {title: 'Google Sign In', client_id});
});

router.use('/web-chat', require('../../web/chat/chat.routes'));

router.use('/ticket', require('../../web/tickets/ticket.routes'));

module.exports = router;
