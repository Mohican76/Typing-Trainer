const quotes = [
    "Practice makes perfect.",
    "Typing fast is a useful skill.",
    "Accuracy is more important than speed.",
    "Stay focused and keep typing.",
    "Small steps lead to big progress.",
    "Consistency beats intensity every time.",
    "Your hands learn what your mind repeats."
];

let currentQuote = "";
let startTime = null;
let timerInterval = null;

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const timeElement = document.getElementById("time");
const resetButton = document.getElementById("reset");

function loadNewQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = currentQuote;
    inputElement.value = "";
    wpmElement.textContent = "0";
    accuracyElement.textContent = "100%";
    timeElement.textContent = "0s";
    startTime = null;
    clearInterval(timerInterval);
}

function calculateWPM(timeElapsed, typedText) {
    const wordsTyped = typedText.trim().split(/\s+/).length;
    return Math.round((wordsTyped / timeElapsed) * 60);
}

function calculateAccuracy(typedText, quote) {
    let correct = 0;
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === quote[i]) correct++;
    }
    return Math.round((correct / quote.length) * 100);
}

inputElement.addEventListener("input", () => {
    const typedText = inputElement.value;

    if (!startTime) {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const timeElapsed = (Date.now() - startTime) / 1000;
            timeElement.textContent = Math.floor(timeElapsed) + "s";
        }, 1000);
    }

    const timeElapsed = (Date.now() - startTime) / 1000;

    if (timeElapsed > 0) {
        wpmElement.textContent = calculateWPM(timeElapsed, typedText);
    }

    accuracyElement.textContent = calculateAccuracy(typedText, currentQuote) + "%";

    if (typedText === currentQuote) {
        clearInterval(timerInterval);
    }
});

resetButton.addEventListener("click", loadNewQuote);

loadNewQuote();