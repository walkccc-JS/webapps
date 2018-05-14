var bgColor = "#232323";
var titleColor = "lightseagreen";

var numSqaures = 6;
var colors = [];
var goalColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#resetBtn");
var modeBtns = document.querySelectorAll(".mode");

init();
function init() {
  setModeButtons();
  setSquares();
  startGame();
}

resetBtn.addEventListener("click", function() {
  startGame();
});

colorDisplay.textContent = goalColor;

function changeColors(color) {
  for (var i = 0; i < squares.length; i++)
    squares[i].style.backgroundColor = color;
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(n) {
  var arr = [];                       // Make an array
  for (var i = 0; i < n; i++)         // Get random color and push into arr
    arr.push(randomColor());
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);    // Pick a "R" from 0-255
  var g = Math.floor(Math.random() * 256);    // Pick a "G" from 0-255
  var b = Math.floor(Math.random() * 256);    // Pick a "B" from 0-255
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function setModeButtons() {
  for (var i = 0; i < modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function() {
      for (var j = 0; j < modeBtns.length; j++)
        modeBtns[j].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSqaures = 3;
      } else if (this.textContent === "Med") {
        numSqaures = 6;
      } else {
        numSqaures = 9;
      }
      startGame();
    });
  }
}

function setSquares() {                                       // backgroundColor > background (FireFox)
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {       // Add click listeners to squares
      var clickedColor = this.style.backgroundColor;      // Grab color of clicked square
      if (clickedColor === goalColor) {                   // Compare clickedColor to goalColor -- Notice: space issue!!
        messageDisplay.textContent = "Win";
        messageDisplay.classList.remove("msgToggle");
        messageDisplay.style.color = goalColor;
        changeColors(goalColor);
        h1.style.backgroundColor = goalColor;
        resetBtn.textContent = "Replay";
      } else {
        this.style.background = bgColor;
        messageDisplay.textContent = ">_";
        messageDisplay.classList.add("msgToggle");
      }
    });
  }
}

function startGame() {
  colors = generateRandomColors(numSqaures);      // Generate all new colors
  goalColor = pickColor();                        // Pick a new random color from array
  colorDisplay.textContent = goalColor;           // Change colors of squares
  resetBtn.textContent = "New";                   // Change textContent back to "New"
  messageDisplay.textContent = "";                // Clear the state of LOL or WIN
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = titleColor;
}
