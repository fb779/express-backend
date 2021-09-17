const {Router} = require('express');

const router = Router();

router.use('/users', require('../../apiModules/users/routes'));

module.exports = router;
