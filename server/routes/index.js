const express = require('express');
const router = express.Router();
const UserRoute = require('./user');

router.use('/users', UserRoute);

module.exports = router;