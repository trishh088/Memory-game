"use strict";
/*
 * Create a list that holds all of your cards
 */
 const leveltwo = ["fa fa-cube", "fa fa-cube",
               "fa fa-paper-plane-o", "fa fa-paper-plane-o",
               "fa fa-bicycle", "fa fa-bicycle",
               "fa fa-bolt", "fa fa-bolt",
               "fa fa-bomb", "fa fa-bomb",
               "fa fa-leaf", "fa fa-leaf",
               "fa fa-diamond", "fa fa-diamond",
               "fa fa-anchor", "fa fa-anchor"
             ]

const levelone = ["fa fa-cube", "fa fa-cube",
               "fa fa-paper-plane-o", "fa fa-paper-plane-o",
               "fa fa-bicycle", "fa fa-bicycle",
               "fa fa-bolt", "fa fa-bolt"]
let gameCards;

var flipCount = 0; //counter to keep track of the cards clicked
var matches = 0;
var cardPairs = 1; // for checking whether all the card pairs are matched or not
var movesCount = 0; // to count the number of steps
var timerInterval = null; // to stop the timer
var timerValue = 0; // to set the initial timer to zero
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var allCardTypes = []; // to store all the cardnames value in an empty array


var setCard = function () {
    var shuffledCards = shuffle(gameCards);
    shuffledCards.forEach(function (symbol) {
        var cardElement = '<li class="card"><i class="' + symbol + '"></i></li>'; // creates a html for adding the cards to the class deck
        $('.deck').append(cardElement); // adds the cardelement to the html class deck

    });
    $('li')
        .click(function (indexNumber) {
            // to show the clicked card
            showOpenCard(this);
            console.log(allCardTypes.length, flipCount);
            // to push the clicked card to the empty array
            OpenedCard(this);

            if (allCardTypes.length >= 2) {
                // to check if the cars=ds are matched
                flipMatch(this)
            } else {
                notAMatch();
                //flips the cards if its not a match
            }
            setTimeout(flipMatch, notAMatch, 500); // to avoid delay in the flipping and to make it look smooth
            gameWin();
            movesCount++; //increments the number of moves
            $('.moves')
                .text(movesCount);
            starRating();

        });

}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    console.log("called");
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// $('li')
//     .click(function (indexNumber) {
//         // to show the clicked card
//         showOpenCard(this);
//         console.log(allCardTypes.length, flipCount);
//         // to push the clicked card to the empty array
//         OpenedCard(this);
//
//         if (allCardTypes.length >= 2) {
//             // to check if the cars=ds are matched
//             flipMatch(this)
//         } else {
//             notAMatch();
//             //flips the cards if its not a match
//         }
//         setTimeout(flipMatch, notAMatch, 500); // to avoid delay in the flipping and to make it look smooth
// gameWin();
// movesCount++;//increments the number of moves
// $('.moves').text(movesCount);
// starRating();
//
//     });

// flip the card to show symbol
var showOpenCard = function (card) {
    var $card = $(card);
    // $card = jquery object and $(card) this makes the jquery onbect
    console.log(card, $card);
    // avoidClick class is added to avoid a user clicking the same cards
    $card.addClass('show open avoidClick');
    flipCount++; // increments the flipCount;

}

// to append the cards to an empty array
var OpenedCard = function (card) {
    allCardTypes.push(card); // to add the new card names to the empty array
}

// checks whether the cards match or not and sets the counters to zero
var flipMatch = function (card) {
    if (allCardTypes.length > 1) { //to avoid innerhtml error
        //checks if the two cards in the allcardtypes array are same or not
        if (allCardTypes[0].innerHTML === allCardTypes[1].innerHTML) {
            // just adds the match to the last two clicks/ the allcardtypes
            $(allCardTypes)
                .slice(0, 2)
                .addClass('match show open ');
            matches++;
            allCardTypes.length = 0;
            flipCount = 0;
        } else
            //resets the array and the counter to zero
            allCardTypes.length = 0;
        flipCount = 0;
    } else {
        // so that the first card is also visible
        $(allCardTypes)
            .slice(0, 1)
            .addClass('show open avoidClick');
    }
}

// if not a match go back to flip state
var notAMatch = function () {
    $('li')
        .removeClass('show open avoidClick');

}
//shuffling after restart anad starRating
var starRating = function () {
    if (movesCount <= 10) {
        $(".score_star")
            .text("⭐⭐⭐");
    } else if (movesCount > 10 && movesCount < 20) {
        $(".score_star")
            .text("⭐⭐");
    } else if (movesCount >= 25) {
        $(".score_star")
            .text("⭐");
    }

}
// Close modals when click outside modal
$('#startModal')
    .click(function () {
        $('#startModal')
            .hide();
    });

$('#winModal #close-win')
    .click(function () {
        $('#winModal')
            .hide();
    });

// Open start modal on load
$(window)
    .on('load', function () {
        $('#startModal')
            .show();
    });

// start modal click function
$('#start')
    .click(function (card) {
        $('#startModal')
            .hide();
        //  shuffle(gameCards);
        gameCards = levelone;

        setCard();
        stopTimer();
        $('li')
            .removeClass('open show match avoidClick');
        matches = 0;
        allCardTypes.length = 0;
        movesCount = 0;
        $('.moves')
            .text(movesCount);
        startTimer();
    });

    $('#leveltwo')
        .click(function (card) {
            $('#startModal')
                .hide();
            //  shuffle(gameCards);
            gameCards = leveltwo;
            setCard();
            stopTimer();
            $('li')
                .removeClass('open show match avoidClick');
            matches = 0;
            allCardTypes.length = 0;
            movesCount = 0;
            $('.moves')
                .text(movesCount);
            startTimer();
        });


// Restart game
$('#restart, .restart')
    .click(function () {
        $('#winModal')
            .hide();
        $('.deck')
            .empty();
        $('#startModal')
            .show();
        stopTimer();
    });

var gameWin = function () {
    if (matches === cardPairs) {
        $('#winModal')
            .show();
        stopTimer();
    }
}

function incrementTimer() {
    timerValue++;
    $('.timer')
        .text(timerValue); // to add the value to the win modal and the screen
}


function startTimer() {
    stop(); // stoping the previous counting (if any)
    timerInterval = setInterval(incrementTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerValue = 0;
}

// var Game = function() {
//     //Preload audio sample(s)
//     this.getGemEfx = new Audio('audio/getGem.wav');
//     this.loseLifeEfx = new Audio('audio/loseLife.wav');
//     this.winGameEfx = new Audio('audio/wingame.wav');
// };
// document.getElementById('mute')
//     .addEventListener('click', function(icon) {
//         if (game.getGemEfx.muted && game.loseLifeEfx && game.winGameEfx) {
//             game.getGemEfx.muted = false
//             game.loseLifeEfx.muted = false
//             game.winGameEfx.muted = false
//             icon.target.innerHTML = '🔊'
//         } else {
//             game.getGemEfx.muted = true
//             game.loseLifeEfx.muted = true
//             game.winGameEfx.muted = true
//             icon.target.innerHTML = '🔇'
//         }
//     })
//
// var game = new Game();
