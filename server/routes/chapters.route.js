const express = require('express');
const router = express.Router();
const controller = require('../controllers/chapters.controller');

/* GET comics . */
router.get('/', controller.getAll);
router.get('/:id', controller.get);


module.exports = router;