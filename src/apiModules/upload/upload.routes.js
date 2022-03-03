const {Router} = require('express');

const router = Router();

router.use((req, res, next) => {
    console.log(`Router of upload files`);
    next();
});

module.exports = router;
