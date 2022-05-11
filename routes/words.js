var express = require('express');
var router = express.Router();
var list = require('../word_lists/nt_greek');

router.get('/level/:level', function (req, res, next) {
	const level = req.params.level;
	console.log('Level', level);
	res.json(list);

});

module.exports = router;
