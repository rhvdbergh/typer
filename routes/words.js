const express = require('express');
const router = express.Router();
const wordList = require('../resources/word_lists/nt_greek_word_list');
const {
	keymaps,
	fullKeymap,
	singleKeymap
} = require('../resources/keymaps/nt_greek_keymap');

router.get('/level/:level', function (req, res, next) {
	let learningLevel = false;
	const level = Number(req.params.level);
	switch (true) {
		// for the first three levels, levels correspond with stages
		case (level <= 3):
			res.json({learningLevel: true, levelWords: Object.values(keymaps[level - 1])});
			break;
		case (level > 3 && level < 29):
			// for stages 4 to 15, the levels do not correspond with stages
			const stage = Math.ceil(level / 2) + 1;
			if (level % 2 === 0) {
				res.json({
					learningLevel: false,
					levelWords: selectWordsForLevel(stage, Math.abs(stage / 2) + 1, stage < 10 ? 20 : 25)
				});
			} else {
				res.json({learningLevel: true, levelWords: Object.values(keymaps[stage - 1])});
			}
		case (level > 28):
			res.json({learningLevel: false, levelWords: selectWordsFromCompleteList(25)});
		default:
			res.json({learningLevel: false, levelWords: selectWordsFromCompleteList(25)});
	}
});

router.get('/keymap', function (req, res, next) {
	res.json({fullKeymap, singleKeymap});
});

module.exports = router;

const selectWordsForLevel = (level, maxWordLength, numWords) => {

	let allowedSymbols = [];
	for (let i = 0; i < level; i++) {
		allowedSymbols.push(...Object.values(keymaps[i]));
	}

	const wordPool = wordList.filter(word => word.length <= maxWordLength);
	const selectedWords = [];

	let safetyCounter = 0;
	while (selectedWords.length < numWords || safetyCounter === 1500) {
		let word = wordPool[pickRandomIndex(wordPool.length)];
		let choppedWord = word;

		for (let i = 0; i < allowedSymbols.length - 1; i++) {
			choppedWord = choppedWord.replaceAll(allowedSymbols[i], '');
		}

		if (choppedWord === '') {
			selectedWords.push(word);
		}
		safetyCounter++;
	}

	if (safetyCounter === 1500) { // couldn't find enough words
		// we're returning the symbol set so nothing breaks and the user has words to type
		return allowedSymbols;
	}

	return selectedWords;
}

const selectWordsFromCompleteList = (numWords) => {

	const selectedWords = [];

	while (selectedWords.length < numWords) {
		selectedWords.push(wordList[pickRandomIndex(wordList.length)]);
	}

	return selectedWords;

}

const pickRandomIndex = (arrayLength) => {
	return Math.floor(Math.random() * arrayLength);
}


