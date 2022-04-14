const {Router} = require('express');

const {
    google: {client_id},
} = require('../../../config/config');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', {title: 'Main App'});
});

router.get('/generic', (req, res) => {
    res.render('generic', {title: 'Main App'});
});

router.get('/elements', (req, res) => {
    res.render('elements', {title: 'Main App'});
});

router.get('/chat', (req, res) => {
    const title = 'Chat';
    const scripts = ['chat-socket.js'];
    res.render('chat', {title, scripts});
});

router.get('/google-sign-in', (req, res) => {
    res.render('google', {title: 'Google Sign In', client_id});
});

module.exports = router;
