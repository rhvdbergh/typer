async function main() {
	const wordContainer = document.getElementById('word_container');
	const wordInput = document.getElementById('word_input');
	const inputTest = document.getElementById('input_test');
	let register = '';

	const evaluateKeyPress = (evt) => {
		console.log(`key pressed: `, evt.key)
		if (evt.key !== 'Backspace') {
			register = wordInput.value;
			if (register === currentWord) {
				console.log('bang!');
			}
			inputTest.innerText = wordInput.value;
		} else {
			wordInput.value = register;
		}
		console.log(`word input is`, wordInput.value);
		wordInput.focus();
	}

	window.addEventListener("keyup", evaluateKeyPress);
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
