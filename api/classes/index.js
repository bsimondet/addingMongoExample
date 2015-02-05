

// Defining the "classes" API module
// =======================================


var express = require('express');
var controller = require('./classes.controller.js');

var router = express.Router();

router.get('/gpaCalculator', controller.index);
router.post('/gpaCalculator', controller.create);
router.delete('/gpaCalculator:class_id', controller.destroy);

module.exports = router;