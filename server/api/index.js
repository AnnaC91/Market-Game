
const router = require('express').Router();


router.use('/auth', require('./auth'));
router.use('/market', require('./market'));

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;