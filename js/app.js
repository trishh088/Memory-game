// to avoid jshint errors
/*jshint esversion: 6 */
/*global $*/
/* jshint -W097 */
"use strict";

const easy = ["fa fa-spinner", "fa fa-spinner",
 "fa fa-circle-o-notch", "fa fa-circle-o-notch",
 "fa fa-refresh", "fa fa-refresh",
 "fa fa-cog ", "fa fa-cog "
];

const medium = ["fa fa-cube", "fa fa-cube",
 "fa fa-paper-plane-o", "fa fa-paper-plane-o",
 "fa fa-bicycle", "fa fa-bicycle",
 "fa fa-bolt", "fa fa-bolt",
 "fa fa-bomb", "fa fa-bomb",
 "fa fa-leaf", "fa fa-leaf",
 "fa fa-amazon", "fa fa-amazon",
 "fa fa-chrome", "fa fa-chrome"
];

const difficult = ["fa fa-cube", "fa fa-cube",
 "fa fa-paper-plane-o", "fa fa-paper-plane-o",
 "fa fa-bicycle", "fa fa-bicycle",
 "fa fa-bolt", "fa fa-bolt",
 "fa fa-bomb", "fa fa-bomb",
 "fa fa-leaf", "fa fa-leaf",
 "fa fa-diamond", "fa fa-diamond",
 "fa fa-anchor", "fa fa-anchor",
 "fa fa-amazon", "fa fa-amazon",
 "fa fa-chrome", "fa fa-chrome"
];


let gameCards; // variable to set levels and call it
var flipCount = 0; //counter to keep track of the cards clicked
var matches = 0;
var cardPairs; // for checking whether all the card pairs are matched or not
var movesCount = 0; // to count the number of steps
var timerInterval = null; // to stop the timer
var timerValue = 0; // to set the initial timer to zero
let notMatchAudio = new Audio('audio/loseLife.wav');
let matchAudio = new Audio('audio/getGem.wav');
let winAudio = new Audio('audio/applause.wav');

var allCardTypes = []; // to store all the cardnames value in an empty array

//sets the deck and shuffle it
var setCard = function() {
 var shuffledCards = shuffle(gameCards); //shuffles the game cards by calling the shuffle function
 shuffledCards.forEach(function(symbol) {
  var cardElement = '<li class="card"><i class="' + symbol + '"></i></li>'; // creates a html for adding the cards to the class deck
  $('.deck').append(cardElement); // adds the cardelement to the html class deck
 });

 // click event so that the cards shuffle even when the refresh button on screen is hit
 $('li').click(function(indexNumber) {
  // to show the clicked card
  showOpenCard(this);
  // to push the clicked card to the empty array
  OpenedCard(this);

  if (allCardTypes.length >= 2) {
   // to check if the cars=ds are matched
   flipMatch(this);
  } else {
   notAMatch();
   //flips the cards if its not a match
  }
  setTimeout(flipMatch, notAMatch, 500); // to avoid delay in the flipping and to make it look smooth
  gameWin();
  movesCount++; //increments the number of moves
  $('.moves').text(movesCount);
  starRating();
 });
};


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

// flip the card to show symbol
var showOpenCard = function(card) {
 var $card = $(card);
 // $card = jquery object and $(card) this makes the jquery onbect
 // avoidClick class is added to avoid a user clicking the same cards
 $card.addClass('show open avoidClick');
 $("i").addClass(' fa-spin  fa-fw '); // to make the icon go round/animate
 flipCount++; // increments the flipCount;
 startTimer();
};

// to append the cards to an empty array
var OpenedCard = function(card) {
 allCardTypes.push(card); // to add the new card names to the empty array
};


// checks whether the cards match or not and sets the counters to zero
var flipMatch = function() {
 if (allCardTypes.length > 1) { //to avoid innerhtml error
   $(allCardTypes).slice(0, 2).addClass(' notmatch animated wobble');
  //checks if the two cards in the allcardtypes array are same or not
  if (allCardTypes[0].innerHTML === allCardTypes[1].innerHTML) {
   // just adds the match to the last two clicks/ the allcardtypes
   $(allCardTypes).slice(0, 2).addClass('match show open animated rubberBand').removeClass('wobble notmatch');
   matches++; //increments so that game win knows how many cards are matched
   matchAudio.play(); // plays the match audio
   allCardTypes.length = 0;
   flipCount = 0;
  } else
  //resets the array and the counter to zero
   allCardTypes.length = 0;
  flipCount = 0;
  notMatchAudio.play();
 } else {
  // so that the first card is also visible
  $(allCardTypes).slice(0, 1).addClass('show open avoidClick');
 }
};

// if not a match go back to flip state
var notAMatch = function() {
 $('li').removeClass('show open avoidClick notmatch');
};

// for star rating for all the levels
var starRating = function() {
 if (gameCards === easy) {
  if (movesCount <= 4) {
   $(".score_star").text("⭐⭐⭐");
  } else if (movesCount > 4 && movesCount < 6) {
   $(".score_star").text("⭐⭐");
  } else if (movesCount >= 10) {
   $(".score_star").text("⭐");
  }
 } else if (gameCards === medium) { // for level two
  if (movesCount <= 10) {
   $(".score_star").text("⭐⭐⭐");
  } else if (movesCount > 10 && movesCount < 20) {
   $(".score_star").text("⭐⭐");
  } else if (movesCount >= 25) {
   $(".score_star").text("⭐");
  }
 } else if (gameCards === difficult) { // for level 3
  if (movesCount <= 15) {
   $(".score_star").text("⭐⭐⭐");
  } else if (movesCount > 15 && movesCount < 25) {
   $(".score_star").text("⭐⭐");
  } else if (movesCount >= 30) {
   $(".score_star").text("⭐");
  }
 }
};


// Open start modal on load
$(window).on('load', function() {
 $('#startModal').show();
});

//button click for level one , resets all necessary condition
$('#start').click(function(card) {
 $('#startModal').hide();
 //selects level one
 gameCards = easy;
 setCard();
 stopTimer();
 $('li').removeClass('open show match avoidClick');
 matches = 0;
 allCardTypes.length = 0;
 movesCount = 0;
 $('.moves').text(movesCount);
});

//button click for level two , resets all necessary condition
$('#leveltwo').click(function(card) {
 $('#startModal').hide();
 gameCards = medium;
 setCard();
 stopTimer();
 $('li').removeClass('open show match avoidClick');
 matches = 0;
 allCardTypes.length = 0;
 movesCount = 0;
 $('.moves').text(movesCount);
});

//button click for level three , resets all necessary condition
$('#levelthree').click(function() {
 $('#startModal').hide();
 gameCards = difficult;
 setCard();
 stopTimer();
 $('li').removeClass('open show match avoidClick');
 matches = 0;
 allCardTypes.length = 0;
 movesCount = 0;
 $('.moves').text(movesCount);
});

// Restart game
$('#restart, .restart').click(function() {
 $('#winModal').hide();
 $('.deck').empty();
 $('#startModal').show();
 stopTimer();
});

//game win condition
var gameWin = function() {
 if (gameCards === easy) {
  cardPairs = 4;
  if (matches === cardPairs) {
   $('#winModal').show();
   winAudio.play();
   stopTimer();
  }
 } else if (gameCards === medium) {
  cardPairs = 8;
  if (matches === cardPairs) {
   $('#winModal').show();
   winAudio.play();
   stopTimer();
  }
 } else if (gameCards === difficult) {
  cardPairs = 10;
  if (matches === cardPairs) {
   $('#winModal').show();
   winAudio.play();
   stopTimer();
  }
 }
};

// Close modals when click outside modal

$('#winModal #close-win')
 .click(function() {
  $('#winModal')
   .hide();
 });

function incrementTimer() {
 timerValue++;
 $('.timer').text(timerValue); // to add the value to the win modal and the screen
}


function startTimer() {
 stopTimer(); // stoping the previous counting (if any)
 timerInterval = setInterval(incrementTimer, 1000);
}

function stopTimer() {
 clearInterval(timerInterval);
 timerValue = 0;
}

// sound on and off
$('.sound').on("click", function() {
 notMatchAudio.volume = 0;
 matchAudio.volume = 0;
 winAudio.volume = 0;
 $('.sound').text("🔇");
 $('.sound').on('click', function() {
  notMatchAudio.volume = 1;
  matchAudio.volume = 1;
  winAudio.volume = 1;
  $('.sound').text("🔊");
 });
});
// Bind to the resize event of the window object
$(window).on("resize", function () {
    // Set .right's width to the window width minus 480 pixels
    $(".deck ul:first-of-type ").width( $(this).width() - 600 );
// Invoke the resize event immediately
}).resize();

//animation for header
$('.header').addClass('animated rubberBand');
