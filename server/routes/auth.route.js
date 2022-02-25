const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

/* GET comics . */
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/logout', controller.logout);
router.get('/token', controller.refreshToken);

module.exports = router;