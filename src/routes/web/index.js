const {Router} = require('express');

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

module.exports = router;
