"use strict";
/*
 * Create a list that holds all of your cards
 */
const gameCards = ["fa fa-cube", "fa fa-cube",
               "fa fa-paper-plane-o", "fa fa-paper-plane-o",
               "fa fa-bicycle", "fa fa-bicycle",
               "fa fa-bolt", "fa fa-bolt",
               "fa fa-bomb", "fa fa-bomb",
               "fa fa-leaf", "fa fa-leaf",
               "fa fa-diamond", "fa fa-diamond",
               "fa fa-anchor", "fa fa-anchor"
             ]

var flipCount = 0; //counter to keep track of the cards clicked
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var allCardTypes = []; // to store all the cardnames value in an empty array
var shuffledCards = shuffle(gameCards);

shuffledCards.forEach(function (symbol) {
    var cardElement = '<li class="card"><i class="' + symbol + '"></i></li>'; // creates a html for adding the cards to the class deck
    $('.deck')
        .append(cardElement); // adds the cardelement to the html class deck
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
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


    });


var showOpenCard = function (card) {
    var $card = $(card);
    // $card = jquery object and $(card) this makes the jquery onbect
    console.log(card, $card);
    // index class is added to avoid a user clicking the same cards
    $card.addClass('show open index');
    flipCount++; // increments the flipCount;

}

var OpenedCard = function (card) {
    allCardTypes.push(card); // to add the new card names to the empty array
}

var flipMatch = function (card) {
    if (allCardTypes.length > 1) { //to avoid innerhtml error
        //checks if the two cards in the allcardtypes array are same or not
        if (allCardTypes[0].innerHTML === allCardTypes[1].innerHTML) {
            // just adds the match to the last two clicks/ the allcardtypes
            $(allCardTypes)
                .slice(0, 2)
                .addClass('match show open ');
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
            .addClass('show open index');
    }
}

var notAMatch = function () {
    $('li')
        .removeClass('show open index');

}
