var express = require('express');
var router = express.Router();
var list = require('../word_lists/nt_greek');

router.get('/list', function (req, res, next) {
	res.json(list);
});


module.exports = router;
