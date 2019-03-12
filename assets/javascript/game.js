// 0. Initialize Global Variables.
var wordsArray = ["PARTNER", "CATAWAMPUS", "HORSE", "LASSO", "SHOOTOUT"];
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var missedGuesses = [];
var wins = 0;
var losses = 0;
var wordDisplay = "";
var guessIndices = [];
var remainingGuesses = 5; // Consider making a ratio here. E.g. if the selected word is 12 letters long, maybe have more guesses.

// 1. Listen for Key Events - Game Start.
function gameStart() {

}

    // 2. Start the game after the user presses any key. Write the wins and losses etc. to the DOM and initialize the game.
    var missedGuesses = [];
    // *** 3. Randomly select a word from the list of words in your words array. 
    var word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    console.log(word + " was the word selected from the array.")

    // *** 4. Use a loop to generate the the board with "_" + " " + ...
    for (let i = 0; i < word.length; ++i) {
        wordDisplay += "_ ";
    }
    wordDisplay = wordDisplay.slice(0, -1); //remove unnecessary space from the end of the word after generating
    console.log(wordDisplay)

    // *** 5. Write the blank word to the DOM.
    document.getElementById("wordDisplayID").innerHTML = wordDisplay;

    // 6. *** Listen for Key Events - these will be user guesses. Only accept it as a guess if the selection is a letter (no numbers, etc.)
    document.onkeyup = function(event) {
        var key = event.key;
        key = key.toUpperCase();
        guessIndices = []; // clear out the guess indices every time a key is pressed.
        
        if (validKeys.includes(key)) {
            var playerGuess = key;

            // 7. Run a loop going through the word that has been selected to see if the users guess matches any of the letters
            // If it matches, record the indice(s) of the letter within the word.
            for(let i = 0; i < word.length; i++) {
                if (word[i] === key) guessIndices.push(i);
            }
            console.log(guessIndices)
            // If the users guess did not match, reduce their remainingGuesses by one.
            // Also, if the letter they guessed did not match, add the letter to the missedGuesses array.
            if (guessIndices.length === 0) {
                if (missedGuesses.includes(key) === false) {
                    missedGuesses.push(key); // only add if they have not previously input that incorrect guess.
                    remainingGuesses -= 1;
                }
                else {
                    alert("You have already guessed " + key + ". Please pick another letter.")
                } 
            }
            console.log(missedGuesses)
            console.log(remainingGuesses)
        }
    }

    // 8. After each guess, do a check to see if they have completed the word. If they have, they get a win. ***Also remove current word from array.

    // 9. If the player is out of guesses, increase their loss counter by one.

    // 10. In either case, if the game has ended, display a button allowing them to play again and restart the game (do not reset counters).