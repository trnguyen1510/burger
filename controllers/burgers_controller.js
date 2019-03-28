var burgers = require('../models/burger.js');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	burgers.all(function (data) {
		var hbsObject = {burgers: data};
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

router.post('/burgers/create', function (req, res) {
	burgers.create(['burger_name'], [req.body.burger_name], function () {
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('condition', condition);

	burgers.update({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/burgers');
	});
});
router.delete('/burgers/delete/', function (req, res) {

    burgers.delete(function () {
        res.redirect('/burgers');
    });
});

module.exports = router;