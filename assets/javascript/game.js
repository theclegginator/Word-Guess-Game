// 0. Initialize Global Variables.
var wordsArray = ["PARTNER", "CATAWAMPUS", "HORSE", "LASSO", "SHOOTOUT"];
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var missedGuesses = [];
var wins = 0;
var losses = 0;
var wordDisplay = "";
var guessIndices = [];
var remainingGuesses = 5; // Consider making a ratio here. E.g. if the selected word is 12 letters long, maybe have more guesses.

// Function for replacing display word indices with guessed input.
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

// 1. Listen for Key Events - Game Start.
function gameStart() {

}

    // 2. Start the game after the user presses any key. Write the wins and losses etc. to the DOM and initialize the game.
    document.getElementById("winsID").innerHTML = wins;
    document.getElementById("lossesID").innerHTML = losses;
    document.getElementById("remainingGuessesID").innerHTML = remainingGuesses;
    var missedGuesses = [];

    // *** 3. Randomly select a word from the list of words in your words array. 
    var word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    console.log(word + " was the word selected from the array.")

    // *** 4. Use a loop to generate the the board with "_" + " " + ...
    for (let i = 0; i < word.length; ++i) {
        wordDisplay += "_ ";
    }
    wordDisplay = wordDisplay.slice(0, -1); //remove unnecessary space from the end of the word after generating

    // *** 5. Write the blank word to the DOM.
    document.getElementById("wordDisplayID").innerHTML = wordDisplay;

    // 6. *** Listen for Key Events - these will be user guesses. Only accept it as a guess if the selection is a letter (no numbers, etc.)
    document.onkeyup = function(event) {
        var key = event.key;
        key = key.toUpperCase();
        guessIndices = []; // clear out the guess indices every time a key is pressed.
        
        if (validKeys.includes(key)) {
            var playerGuess = key;

            // *** 7. Run a loop going through the word that has been selected to see if the users guess matches any of the letters
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
                    document.getElementById("missedGuessesID").innerHTML = missedGuesses;
                    remainingGuesses -= 1;
                    document.getElementById("remainingGuessesID").innerHTML = remainingGuesses;
                }
                else {
                    alert("You have already guessed the letter " + key + ". Please pick another letter.")
                } 
            }
            // *** 8. If the guess was in the word, replace the letter(s) on the screen.
            if (guessIndices.length > 0) { 
                for (let i = 0; i < guessIndices.length; i++) {
                    wordDisplay = replaceAt(wordDisplay, (2*guessIndices[i]), key); // replace at 2*guessIndices due to spaces
                }
                // Then update the word on the screen.
                document.getElementById("wordDisplayID").innerHTML = wordDisplay;
            }
            console.log(missedGuesses)
            console.log(remainingGuesses)
            // 9. After each guess, do a check to see if the player has completed the word. If they have, they get a win. ***Also remove current word from array.
            var check = wordDisplay.replace(/ /g, "") // removes all spaces from wordDisplay
            
            // ===== WIN SCENARIO =====

            if (check === word) {
                wins++;
                document.getElementById("winsID").innerHTML = wins;
                // console.log(wordsArray)
            }
            // 10. If the player is out of guesses, increase their loss counter by one.
            
            // ===== LOSS SCENARIO =====
            
            if (remainingGuesses === 0) {
                losses++;
                document.getElementById("lossesID").innerHTML = losses;
            }

            // 11. In either case, if the game has ended, display a button allowing them to play again and restart the game (do not reset counters).
           
        }
    }

    // NOTE: should probably do a loop to put a space in between every missed guess letter since it looks a little tight.
    // NOTE: do something special if they got all the words from wordsArray.
    // NOTE: I think I need to add a sound to play when they get the correct word or something.
    // NOTE: Need to add a loop after winning to remove the word you figured out from the words array.
    