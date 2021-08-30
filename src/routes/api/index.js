const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    msg: 'Primera peticion get del api',
  });
});

router.post('/', (req, res) => {
  res.json({
    msg: 'Primera peticion get del api',
  });
});

module.exports = router;
