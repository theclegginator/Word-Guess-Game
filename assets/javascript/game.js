// 0. Initialize Global Variables.
var wordsArray = ["PARTNER", "CATAWAMPUS", "HORSE", "LASSO", "SHOOTOUT", "SPURS", "COWBOY", "ARMADILLO", "TUMBLEWEED", "LOCAMOTIVE", "SALOON", "WAGON", "SADDLE"];
var validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
var missedGuesses = [];
var pause = true;
var wins = 0;
var losses = 0;
var wordDisplay = "";
var prevWord = "";
var guessIndices = [];
var remainingGuesses = 5; // Consider making a ratio here. E.g. if the selected word is 12 letters long, maybe have more guesses.

// 2. Write the wins and losses etc. to the DOM and initialize the game.
document.getElementById("winsID").innerHTML = wins;
document.getElementById("lossesID").innerHTML = losses;
document.getElementById("remainingGuessesID").innerHTML = remainingGuesses;
var missedGuesses = [];

// Function for replacing display word indices with guessed input.
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

// Function for starting the game (or starting a new word)
function gameStart() {
    //animate color back to white at start of each round
    $( document ).ready(function() {
        $(function(){
            $("h1").animate({
            color: "white"
            }, "fast");
        });
    });
    // *** 3. Randomly select a word from the list of words in your words array.
    word = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    // restart the function to pick a word if it tries to pick the same word twice in a row as long as there are other words available.
    if (word === prevWord && wordsArray.length > 1) {
        gameStart();
    }
    //console.log(word + " was the word selected from the array.")
    remainingGuesses = 5;
    wordDisplay = ""; // Need to clear out wordDisplay so the string doesn't keep growing between rounds.
    missedGuesses = [];
    document.getElementById("remainingGuessesID").innerHTML = remainingGuesses;
    document.getElementById("missedGuessesID").innerHTML = "-";

    // *** 4. Use a loop to generate the the board with "_" + " " + ...
    for (let i = 0; i < word.length; ++i) {
        wordDisplay += "_ ";
    }
    wordDisplay = wordDisplay.slice(0, -1); //remove unnecessary space from the end of the word after generating

    // *** 5. Write the blank word to the DOM.
    document.getElementById("wordDisplayID").innerHTML = wordDisplay;
    pause = false;
}

gameStart(); //Initialize the game the first time the page is run.

// 6. *** Listen for Key Events - these will be user guesses. Only accept it as a guess if the selection is a letter (no numbers, etc.)
document.onkeyup = function(event) {
    if (pause === false) {
        var key = event.key;
        key = key.toUpperCase();
        guessIndices = []; // clear out the guess indices every time a key is pressed.
    }

    if (validKeys.includes(key) && wordsArray.length !== 0) {
        var playerGuess = key;

        // *** 7. Run a loop going through the word that has been selected to see if the users guess matches any of the letters
        // If it matches, record the indice(s) of the letter within the word.
        for(let i = 0; i < word.length; i++) {
            if (word[i] === key) guessIndices.push(i);
        }

        // If the users guess did not match, reduce their remainingGuesses by one.
        // Also, if the letter they guessed did not match, add the letter to the missedGuesses array.
        if (guessIndices.length === 0) {
            if (missedGuesses.includes(" " + key) === false) {
                missedGuesses.push(" " + key); // only add if they have not previously input that incorrect guess.
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

        // 9. After each guess, do a check to see if the player has completed the word. If they have, they get a win.
        var check = wordDisplay.replace(/ /g, "") // removes all spaces from wordDisplay
        
        // ===== WIN SCENARIO =====

        if (check === word) {
            //play audio
            var audioSuccess = new Audio('assets/audio/success_tune.mp3');
            audioSuccess.play();
            //animate color to green
            $(function(){
                $("h1").animate({
                color: "#409b39"
                });
            });

            wins++;
            document.getElementById("winsID").innerHTML = wins;
            wordsArray.splice( wordsArray.indexOf(word), 1 ); // Remove the current word from the words array since the player got it already.
            prevWord = word;
            // check to see if the player has found all the words in the game
            if (wordsArray === undefined || wordsArray.length == 0) {
                alert("BY GOLLY! You done found all the words in this here game. Yer' the downright champeen! Congratulations!")
            }
            // if they have not, start another round.
            else {
                pause = true;
                setTimeout(gameStart, 1200);
            }
        }
        // 10. If the player is out of guesses, increase their loss counter by one.
        
        // ===== LOSS SCENARIO =====
        
        if (remainingGuesses === 0) {
            losses++;
            document.getElementById("lossesID").innerHTML = losses;
            var audioFailure = new Audio('assets/audio/failure.mp3');
            audioFailure.play();
            //animate color to red
            $(function(){
                $("h1").animate({
                color: "rgb(255, 72, 72)"
                });
            });
            prevWord = word;
            pause = true;
            setTimeout(gameStart, 1200 ); // Automatically start another round.
        }
    }
}