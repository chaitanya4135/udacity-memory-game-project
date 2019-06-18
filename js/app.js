"use strict";
var pappa = document.getElementsByClassName("deck");

/*
 * Create a list that holds all of your cards
 */



 // variables are created for using in the the app.js file all these are declared globally

var beta = document.querySelectorAll(".card");
var betaList = [...beta];
var state = 0;
var moves = 0;
var sec = 0;
var hour = 0;
var min = 0;
var moveSet = document.getElementById("Moves");
let msgText = document.getElementById('msg-text');
var starsports = [...document.getElementsByClassName("fa-star")];
let information = document.getElementById('information');
let gradeSpan = document.getElementById('grade');
var match = 0;
var timeSection;
var cardSet = [];
var starnu = 3;
let grade = 'Great!';
var lastFlipped = null;
let pause = false;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
// function for reloading
function loading() {
  document.location.reload();
}
window.onload = start();

function start() {
  var kalupu = shuffle(betaList);
  for (var i = 0; i < kalupu.length; i++) {
    pappa[0].append(kalupu[i]);
  }
}

 // adding eventlistener to all the cards
for (var i = 0; i < betaList.length; i++) {
  betaList[i].addEventListener("click", showCard);
}
// for displaying whether  cards are matched or notmatched
function flash_msg(message) {
    msgText.innerText = message;
    setTimeout(function(){ msgText.innerText = ''; }, 1725);
  }
// for showing the card
function showCard() {
  if (state == 0) {
    startTime();
    state = state + 1;
  }

  this.classList.add("card");
  this.classList.add("open");
  this.classList.add("show");
  this.classList.add("disable");

  cardSet.push(this);
  if (cardSet.length == 2) {
    // console.log(cardSet[0].children[0].classList.item(1));
    moves = moves + 1;
    moveSet.innerHTML = moves;
    // checking whether cards are matched or note
    // if card matched those cards will no turn
    // if they don't match they wil close
    if (cardSet[0].children[0].classList.item(1) == cardSet[1].children[0].classList.item(1)) {
      console.log("matched");
      cardSet[0].classList.add("match", "disable");
      cardSet[1].classList.add("match", "disable");
      cardSet = [];
      let message = 'match found!';
            console.log(message);
            flash_msg(message);
      match = match + 1;
      if (match == 8) {
        clearInterval(timeSection);
          // when you lose one  star it displays two stars
        if(starnu==1){
        swal.fire({
          title: "congratulations",
          html: 'you earned <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <br> and you completed this game with the time of <br>' + hour+ 'hour:' + min + 'min:' + sec + 'sec:',
          confirmButtonText: '<i class="fa fa-repeat"></i>restart',
        })
         // reloads the deck
        .then(()=>{
          document.location.reload();
        });
      }
      // when you lose one  star it displays two stars

      if(starnu==2){
      swal.fire({
        title: "congratulations",
        html: 'you earned <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <br> and you completed this game with the time of <br>' + hour+ 'hour:' + min + 'min:' + sec + 'sec:',
        confirmButtonText: '<i class="fa fa-repeat"></i>restart',
      })
      .then(()=>{
        document.location.reload();
      });
    }
    // when you complete game before loosing one star it displays three stars

    if(starnu==3){
    swal.fire({
      title: "congratulations",
      html: 'you earned <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <strong style="color:gold;text-shadow:3px 3px 3px #000"> <i class="fa fa-star"></i></strong> <br> and you completed this game with the time of <br>' + hour+ 'hour:' + min + 'min:' + sec + 'sec:',
      confirmButtonText: '<i class="fa fa-repeat"></i>restart',
    })
    .then(()=>{
      document.location.reload();
    });
  }
      }
    } else {
      // when the cards notmatched we use this  for closing card
      console.log("unmatched");
      cardSet[0].classList.add("unmatch");
      cardSet[1].classList.add("unmatch");
      let message = 'not matched';
            console.log(message);
            flash_msg(message);
            pause = true;
      cardSet.map((beta) => {
        setTimeout(() => {
          beta.classList.remove("unmatch", "open", "show", "disable");
        }, 200)
        cardSet = [];
      })
      starnumber();
    }
  }
}
// when you start game it automatically starts the timer
function startTime() {

  timeSection = setInterval(() => {
    if (min == 60) {
      min = 0;
      hour = hour + 1;
    }
    sec = sec + 1;
    if (sec == 59) {
      sec = 0;
      min = min + 1;
    }

    time.innerHTML = hour + "::" + min + "::" + sec;
  }, 1000)
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
var count = 0;
var calculate = 0;

function starnumber() {
  if (moves > 14 && moves < 18) {
    starnu = 2;
    starsports[2].style.color = "black";
    count = count + 1;
  }

  // displaying sweetalert when you loose one star
  if (moves == 15 && count == 1) {
    swal.fire('you lost <strong style="color:gold;text-shadow:3px 3px 3px #000"><i class="fa fa-star"></i></strong>');

  }
  if (moves > 24) {
    starnu = 1;
    starsports[1].style.color = "black";
    calculate = calculate + 1;
  }
  // displaying sweetalert when you loose two star

  if (moves == 25 && calculate == 1) {
    swal.fire('you lost <strong style="color:gold;text-shadow:3px 3px 3px #000"><i class="fa fa-star"></i></strong> <strong style="color:gold;text-shadow:3px 3px 3px #000"><i class="fa fa-star"></i></strong>');
  }
}
