'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// const score0El = document.querySelector('#score--0');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1'); // A little bit faster
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Declaring used variable outsite the init function to resolve the scope issue
let scores, currentScore, activePlayer, playing;

const init = function () {
    /* Since the arrays are 0 based index we have kept 
    Player 1 as player 0 and Player 2 as player 1. */
    // These variables are scoped to this init function
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0; // Player 1 starts the game
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

function switchingPlayer() {
    // Swtich to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    /* toggle() removes the class if it is there and adds the class if it 
    is not using this specific method becuase it reduces the work of checking 
    and also we are starting with Player 1 with player--active */
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling the Dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `images/diceRollSnaps/dice-${dice}.png`;
        // 3. Check for rolled 1: if true swtich to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            // current0El.textContent = currentScore; // CHANGE LATER
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Swtich to next player
            switchingPlayer();
        }
    }
});

// Holding the score
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to the active player's score - activePlayer can be 0/1
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        // 2. Check if the score is >= 30: if true current player wins and finish the game
        if (scores[activePlayer] >= 30) {
            // Finish the Game
            playing = false;
            diceEl.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            // 3. Else switch the player
        } else {
            // Swtich to next player
            switchingPlayer();
        }
    }
});

// No need to write the whole function structure the JS will take care of it.
btnNew.addEventListener('click', init);
