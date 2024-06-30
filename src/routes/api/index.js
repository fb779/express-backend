const {Router} = require('express');
const {
    routes_dir: {apiRoutes},
} = require('../../../config/config');

// const {validateJWT} = require('../../middleware');

const router = Router();

/**
 * Routes manually
 */
// router.use('/auth', require('../../apiModules/auth/auth.routes'));

// router.use(validateJWT);

// router.use('/categories', require('../../apiModules/categories/categories.routes'));

// router.use('/products', require('../../apiModules/products/product.routes'));
// router.use('/roles', require('../../apiModules/roles/role.routes'));
// router.use('/uploads', require('../../apiModules/upload/upload.routes'));
// router.use('/users', require('../../apiModules/users/user.routes'));

/**
 * Routes
 */
const {includeAllRoutes} = require('../../helpers/load-routes');

includeAllRoutes({router, routerPath: apiRoutes});

module.exports = router;
