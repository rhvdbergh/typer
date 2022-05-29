var express = require('express');
var router = express.Router();
var list = require('../resources/word_lists/nt_greek_word_list');
var keymap = require('../resources/keymaps/nt_greek_keymap');

router.get('/level/:level', function (req, res, next) {
	const level = req.params.level;
	console.log('Level', level);
	res.json(list);
});

router.get('/keymap', function (req, res, next) {
	res.json(keymap);
});

module.exports = router;
