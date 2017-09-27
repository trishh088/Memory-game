"use strict";
/*
 * Create a list that holds all of your cards
 */
const gameCards = ["fa fa-cube","fa fa-cube",
               "fa fa-paper-plane-o","fa fa-paper-plane-o",
               "fa fa-bicycle","fa fa-bicycle",
               "fa fa-bolt","fa fa-bolt",
               "fa fa-bomb","fa fa-bomb",
               "fa fa-leaf","fa fa-leaf",
               "fa fa-diamond","fa fa-diamond",
               "fa fa-anchor","fa fa-anchor"
             ]

// var allCards = []; // to store all the cardnames value in an empty array
// var allCardIds = []; //empty array to store allthe cards ids
// var tiles_flipped = 0; // to keep track of how many tiles are flipped


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var allCardTypes = [];
 var shuffledCards = shuffle(gameCards);

 shuffledCards.forEach(function(symbol) {
     var cardElement = '<li class="card"><i class="' + symbol + '"></i></li>';
     $('.deck').append(cardElement);
 });



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
