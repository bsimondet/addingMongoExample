'use strict';

// Defining the "classes" API module
// =======================================


var express = require('express');
var controller = require('./gpaCalculator.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:class_id', controller.destroy);

module.exports = router;