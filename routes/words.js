const express = require('express');
const router = express.Router();
const list = require('../resources/word_lists/nt_greek_word_list');
const {keymap, levelOneKeymap, levelTwoKeymap} = require('../resources/keymaps/nt_greek_keymap');

router.get('/level/:level', function (req, res, next) {
	const level = Number(req.params.level);
	if (level === 1) {
		res.json(Object.values(levelOneKeymap));
	} else {
		res.json(list);
	}
});

router.get('/keymap', function (req, res, next) {
	res.json(keymap);
});

module.exports = router;
