let timerCounter;
const timerPenalty = 1;
let waitForUserInput;

let selectedQuestions = [];
let currentQuestion = {};
let questionsAnsweredCorrectly = 0;

function randomUpToMax(max) {
  return Math.floor(Math.random() * max);
}

// This function updates a the timer on the page
function updateElementText(element, textUpdate) {
  $(element).text(textUpdate);
}

// this function will start a timer
function startTimer(timeLimit) {
  timerCounter = timeLimit;
  const timer = setInterval(function(){
    $("#timer").text(timerCounter);
    timerCounter--;
    if (timerCounter <= 0) {
      clearInterval(timer);
      $("#timer").hide();
      displayResults();
    }
  }, 1000);
}

// this functions grabs a random question object from myQuestions.js
function selectQuestion() {
  currentQuestion = myQuestions.splice(randomUpToMax(myQuestions.length), 1).pop();
}

// this function displays a question from questions.js
function displayQuestion(element) {
  $(element).text(currentQuestion.question);
}

// this function will add any number of buttons to an element in HTML
function addButtons(parentEl, x) {
  for (let i = 0; i < x; i++) {
    const newButton = $('<button>').attr({id:"button" + (i+1)});
    $(parentEl).append(newButton);
  }
}

// this function adds buttons with specific answers on them
function displayButtons(element, x) {
  for (let i = 0; i < x; i++) {
    const buttonNumber = (i + 1);
    const buttonNumberToString = buttonNumber.toString();
    $(element + buttonNumberToString).text(currentQuestion.answers[buttonNumber]);
  }
}

// this function sets a boolean to right and wrong dom elements
function setAnswerValues(element, x) {
  const objectKeyArray = Object.keys(currentQuestion.answers)
  for (let i = 0; i < x; i++) {
    const buttonNumber = (i + 1);
    const buttonNumberToString = buttonNumber.toString();
    if (objectKeyArray[i] === currentQuestion.correctAnswer) {
      $(element + buttonNumberToString).attr("value", true)
    }
    else {
      $(element + buttonNumberToString).attr("value", false)
    }
  }
}

// function that moves current question to selected question array
function grabNextQuestion() {
  selectedQuestions.push(currentQuestion);
  currentQuestion = {}
  selectQuestion()
}

function deleteElementsFromParent(parentEl) {
  $(parentEl).empty();
}

function submitResults() {
  deleteElementsFromParent("#answer-buttons");
  addButtons("#answer-buttons", 1)
  $("#button1").attr("onclick", "restartGame()").text("Play Again?");
}

// Testing Grounds!!!
function displayResults() {
  deleteElementsFromParent("#answer-buttons");
  $(".answer-score").hide();
  $("#question").hide();
  $("#answer-buttons").text("Times Up! Here is your score: " + questionsAnsweredCorrectly);
  addButtons("#answer-buttons", 1)
  $("#button1").attr("onclick", "submitResults()").text("Submit Your Score!");
}
// Testing Grounds!!!

function startGame() {
  $("#start-game").hide();
  startTimer(30);
  currentQuestion = {};
  selectQuestion();
  displayQuestion("#question");
  addButtons("#answer-buttons", 5);
  displayButtons("#button", 5);
  setAnswerValues("#button", 5)
}

function restartGame() {
  window.location.reload()
}

function switchQuestion() {
  deleteElementsFromParent("#answer-buttons");
  grabNextQuestion();
  displayQuestion("#question");
  addButtons("#answer-buttons", 5);
  displayButtons("#button", 5);
  setAnswerValues("#button", 5)
}

// This button checks values against the selected answer and either penalizes the user or moves on to the next question.
$(document).on("click", "button" ,function() {
  let buttonValue = $(this).attr("value");
  if (timerCounter > 0 && buttonValue === "false") {
    timerCounter -= timerPenalty;
    updateElementText("#timer", timerCounter);
  }
  else if (timerCounter > 0 && buttonValue === "true") {
    questionsAnsweredCorrectly++
    updateElementText("#answer-counter", questionsAnsweredCorrectly);
    if (myQuestions.length > 0) {
      switchQuestion();
    } else {
      displayResults();
      $("#timer").hide();
    }
  }
});

