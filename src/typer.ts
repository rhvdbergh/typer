async function main() {
    const wordContainer: HTMLElement | null = document.querySelector('#word_container');
    const wordInput: HTMLInputElement | null = document.querySelector('#word_input');
    const inputTest: HTMLElement | null = document.querySelector('#input_test');
    let score = 0;
    let level = 1;
    let words = await getLevelWords(level);
    let currentWord = pickRandomWordFrom(words);

    const evaluateKeyPress = async (evt: KeyboardEvent) => {
        console.log(`key pressed: `, evt.key)
        console.log('words', words);
        if (wordInput && wordInput?.value === currentWord) {
            // we have a match!
            score++;
            words = removeFromWords(currentWord, words);
            if (words.length === 0) {
                level++;
                words = await getLevelWords(level);
            }
            currentWord = pickRandomWordFrom(words);
            if (wordContainer) wordContainer.innerText = currentWord;
            wordInput.value = '';
        } else if (wordInput && currentWord.substring(0, wordInput.value.length) !== wordInput.value) {
            wordInput.value = '';
        }


        if (inputTest && wordInput?.value) inputTest.innerText = wordInput?.value;

        console.log(`word input is`, wordInput?.value);
        wordInput?.focus();
    }

    window.addEventListener("keyup", evaluateKeyPress);
    window.addEventListener("keydown", e => {

        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End", "PageUp", "PageDown", "Enter"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    })
    window.addEventListener("click", () => wordInput?.focus());

    if (wordContainer) wordContainer.innerText = currentWord;
};

main();

async function getLevelWords(level: number) {
    const response = await fetch(`/words/level/${level}`);
    const words = await response.json();
    return words;
}

const pickRandomWordFrom = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)];
}

const removeFromWords = (word: string, words: string[]) => {
    let index = words.indexOf(word);
    words.splice(index, 1);
    return words;
}
