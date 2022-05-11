async function main() {
	const wordContainer = document.getElementById('word_container');
	const wordInput = document.getElementById('word_input');
	const inputTest = document.getElementById('input_test');
	let score = 0;
	let level = 1;
	let words = await getLevelWords(level);
	let currentWord = pickRandomWordFrom(words);

	const evaluateKeyPress = async (evt) => {
		console.log(`key pressed: `, evt.key)
		console.log('words', words);
		if (wordInput.value === currentWord) {
			// we have a match!
			score++;
			words = removeFromWords(currentWord, words);
			if (words.length === 0) {
				level++;
				await getLevelWords(level);
			}
			currentWord = pickRandomWordFrom(words);
			wordContainer.innerText = currentWord;
			wordInput.value = '';
		}
		inputTest.innerText = wordInput.value;

		console.log(`word input is`, wordInput.value);
		wordInput.focus();
	}

	window.addEventListener("keyup", evaluateKeyPress);
	window.addEventListener("keydown", e => {

		if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
			e.preventDefault();
		}
	})
	window.addEventListener("click", () => wordInput.focus());

	wordContainer.innerText = currentWord;
};

main();

async function getLevelWords(level) {
	const response = await fetch(`/words/level/${level}`);
	const words = await response.json();
	return words;
}

const pickRandomWordFrom = (words) => {
	return words[Math.floor(Math.random() * words.length)];
}

const removeFromWords = (word, words) => {
	let index = words.indexOf(word);
	words.splice(index, 1);
	return words;
}
