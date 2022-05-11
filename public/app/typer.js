async function main() {
	const wordContainer = document.getElementById('word_container');
	const wordInput = document.getElementById('word_input');
	const inputTest = document.getElementById('input_test');

	const evaluateKeyPress = (evt) => {
		console.log(`key pressed: `, evt.key)
		if (wordInput.value === currentWord) {
			console.log('bang!');
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

	const words = await getLevelWords();
	const currentWord = pickRandomWordFrom(words);

	wordContainer.innerText = currentWord;
};

main();

async function getLevelWords() {
	const response = await fetch('/words/level/3');
	const words = await response.json();
	return words;
}

const pickRandomWordFrom = (words) => {
	return words[Math.floor(Math.random() * words.length)];
}
