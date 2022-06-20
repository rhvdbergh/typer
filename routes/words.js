const express = require('express');
const router = express.Router();
const list = require('../resources/word_lists/nt_greek_word_list');
const {
	keymaps,
	fullKeymap
} = require('../resources/keymaps/nt_greek_keymap');

router.get('/level/:level', function (req, res, next) {
	const level = Number(req.params.level);
	console.log('level', level);
	switch (level) {
		case 1:
		case 2:
		case 3:
			res.json(Object.values(keymaps[level - 1]));
			break;
		case 4:

			console.log(selectWords(level, 3));
			res.json(list);
		case 5:
			res.json(Object.values(keymaps[1]));
			break;
		case 3:
			res.json(Object.values(keymaps[2]));
			break;
		default:
			res.json(list);
	}
});

router.get('/keymap', function (req, res, next) {
	res.json(fullKeymap);
});

module.exports = router;

const selectWords = (level, maxWordLength) => {

	let allowedSymbols = [];
	for (let i = 0; i < level; i++) {
		allowedSymbols.push(...Object.values(keymaps[i]));
	}
	console.log(allowedSymbols);

}

