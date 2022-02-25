const express = require('express');
const router = express.Router();
const controller = require('../controllers/comics.controller');

/* GET comics . */
router.get('/', controller.getAll);

router.get('/:id', controller.get);
  
/* POST comic */
router.post('/', controller.create);

/* PUT comic */
router.put('/:id', controller.update);

/* DELETE comic */
router.delete('/:id', controller.remove);

module.exports = router;