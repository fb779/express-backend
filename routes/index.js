var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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
