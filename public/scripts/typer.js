async function main() {
	const wordContainer = document.getElementById('word_container');

	window.addEventListener("keydown", e => {
		console.log('TYPER');
	});

	async function getWords() {
		const response = await fetch('/list');
		const words = await response.json();
		return words;
	}

	const words = await getWords();
	console.log(words[0]);
	wordContainer.innerText = words[0];

};

main();