const {Router} = require('express');

const {validateJWT} = require('../../middleware');

const router = Router();

router.use('/auth', require('../../apiModules/auth/auth.routes'));

router.use(validateJWT);

router.use('/categories', require('../../apiModules/categories/categories.routes'));
router.use('/roles', require('../../apiModules/roles/role.routes'));
router.use('/users', require('../../apiModules/users/user.routes'));

module.exports = router;
