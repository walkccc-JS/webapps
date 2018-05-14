var numCards = 16;                      // Initial number of cards
var moveCount = 0;                      // Move counts
var moves = $(".moves");                // Moves
var popup = $("#popup");                // The popup window           
var openedCards = [];                   // The array of opened cards

init();
function init() {
  setButtons();
  startGame();
}

function appendCards(n) {
  var items = [];
  if ($(".numBtn").hasClass("numSelected")) {
    for (var i = 0; i < n / 2; i++) {
      var inArray = false;
      while (!inArray) {
        var randomNum = Math.floor(Math.random() * 100);
        if (jQuery.inArray(randomNum, items) === -1) {
            items[items.length] = '<li class="card" type="' + i.toString() + '"><i>' + randomNum.toString() + '</i></li>';
            inArray = true;
        }
      }
    }
  } else {
    fontAwesomes = shuffle(fontAwesomes);           // Shuffle the fontAwesomes array
    items = fontAwesomes.slice(0, n / 2);           // Set the size of items array
  }
  
  items = shuffle(items.concat(items));             // Duplicate and Shuffle the items array
  $(".deck").empty();                               // Empty the deck array
  for (var i = 0; i < n; i++)                       // Append items to the container "deck"
    $(".deck").append(items[i]);
    
  var cardSize = (80 / Math.sqrt(n)).toString().concat("%");
  $(".deck .card").css({ width: cardSize, height: cardSize });
}

function setButtons() {
  setModeBtns();
  $(".restart").click(function() {                        // Set the restart button
    startGame(); 
  });
  $(".numBtn").click(function() {                         // Set the num button
    $(".numBtn").toggleClass("numSelected");
    startGame();
  });
  $(".forfeitBtn").click(function() {                     // Set the forfeit button
    $(".forfeitBtn").addClass("forfeitSelected");
    $(".card").addClass("match", "disabled")
    $(".card").removeClass("show", "open");
  });
}

function setModeBtns() {
  var modeBtns = $(".mode");                          // modeBtns to hold three levels
  for (var i = 0; i < modeBtns.length; i++) {         // Add listeners to each mode
    modeBtns[i].addEventListener("click", function() {
      modeBtns.removeClass("selected");
      this.classList.add("selected");
      switch (this.textContent) {
        case "Easy": numCards = 4; break;
        case "Med": numCards = 16; break;
        case "Hard": numCards = 36; break;
      }
      startGame();
    });
  }
}

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
};

function matched() {
  openedCards.forEach(function(item) {
    item.classList.add("match", "disabled");
    item.classList.remove("show", "open");
  });
  openedCards = [];
}

function unmatched() {
  openedCards.forEach(function(item) {
    item.classList.add("unmatched");
  });
  disable();
  setTimeout(function() {
    openedCards.forEach(function(item) {
      item.classList.remove("show", "open", "unmatched");
    });
    enable();
    openedCards = [];
  }, 500);
}

function disable() {                    // @description disable cards temporarily
  Array.prototype.filter.call(cards, function(card) {
    $(".card").addClass("disabled");
  });
}

function enable() {                     // @description enable cards and disable matched cards
  Array.prototype.filter.call(cards, function(card) {
    $(".card").removeClass("disabled");
    $(".match").addClass("disabled");
  });
}

function moveCounter() {                // @description count player"s moves
  moveCount++;
  moves.html(moveCount);
  if (moveCount == 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
}

var second = 0, minute = 0;
var interval;
function startTimer() {
  interval = setInterval(function() {
    $(".timer").text(minute + "mins " + second + "secs");
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
  }, 1000);
}

function startGame() {                  // @description function to start a new play
  openedCards = [];
  popup.removeClass("show");
  appendCards(numCards);
  cards = $(".card");
  $(".forfeitBtn").removeClass("forfeitSelected");
  addCardsListener();
    
  moveCount = 0;
  moves.html(moveCount);

  $(".fa-star").css({
    color: "#FFD700",
    visibility: "visible"
  });

  second = 0;
  minute = 0;

  $(".timer").text("0 mins 0 secs");
  clearInterval(interval);
}

function addCardsListener() {
  for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", function (){
      this.classList.toggle("open");
      this.classList.toggle("show");
      this.classList.toggle("disabled");
      
      openedCards.push(this);
      moveCounter();
      
      if (openedCards.length === 2) {
        if (openedCards[0].type === openedCards[1].type) matched();
        else unmatched();
      }
      
      if ($(".match").length == cards.length) {
        clearInterval(interval);
        popup.addClass("show");
        $("#finalMove").html(moveCount);
        $("#starRating").html($(".stars").html());
        $("#totalTime").html($(".timer").text());
        $("#replay").click(function() { startGame(); });
        $(".close").click(function() { startGame(); });
      }
    });
  };
}