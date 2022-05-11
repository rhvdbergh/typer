async function main() {
	const wordContainer = document.getElementById('word_container');
	const wordInput = document.getElementById('word_input');
	let register = '';

	const evaluateKeyPress = (evt) => {
		if (wordInput.value === currentWord) {
			console.log('bang!');
		}
		console.log(`word input is`, wordInput.value);
		wordInput.focus();
	}

	window.addEventListener("keydown", evaluateKeyPress);
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
