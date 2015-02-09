

// Defining the "dbClass" API module
// =======================================


var express = require('express');
var controller = require('./classes.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:classes_id', controller.destroy);

module.exports = router;