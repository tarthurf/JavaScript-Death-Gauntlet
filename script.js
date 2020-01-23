let timerCounter;
const timerPenalty = 1;

let selectedQuestions = [];
let currentQuestion = {};

function randomUpToMax(max) {
  return Math.floor(Math.random() * max);
}

// This function updates a the timer on the page
function updatePageTimer() {
  $("#timer").text(timerCounter);
}

// this function will start a timer
function startTimer(timeLimit) {
  timerCounter = timeLimit;
  const timer = setInterval(function(){
    $("#timer").text(timerCounter);
    timerCounter--;
    if (timerCounter <= 0) {
      clearInterval(timer);
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
function displayAnswerButtons(element, x) {
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
      $(element + buttonNumberToString).attr({value: true, onclick: startNextQuestion()})
    }
    else {
      $(element + buttonNumberToString).attr("value", false)
    }
  }
}

// TODO: create function that will start a new set of questions to display
// use setTimeout() = to timerCounter * 1000 while user is choosing a question
// When user selects the correct question this function runs, starting with clearTimeout()
// load next question
// reset setTimeout() to = current timerCounter
function startNextQuestion() {

}

// function that moves current question to selected question array
function changeToNextQuestion() {
  selectedQuestions.push(currentQuestion);
  currentQuestion = {}
}

function deleteElementsFromParent(parentEl) {
  $(parentEl).empty();
}


// Testing Grounds!!!

// Testing Grounds!!!


// TODO: Fix timer penalty on wrong answer click
$("button").on("click", function() {
  let buttonValue = $(this).attr("value");
  if (timerCounter > 0 && buttonValue === "false") {
    timerCounter -= timerPenalty;
    updatePageTimer();
  }
});

function startGame() {

  $(document).ready(function(){
    $("#start-game").hide();
    startTimer(30)
    if (timerCounter > 0) {
      selectQuestion();
      displayQuestion("#question")
      addButtons("#answer-buttons", 5)
      displayAnswerButtons("#button", 5)
      
      
      // deleteElementsFromParent("#answer-buttons");
      // addButtons("#answer-buttons", 5);
    }   
  });
}

// When game starts

// All these things happen in tandem
  // timer starts
  // random question added to current question
  // question is displayed in element
  // answer buttons created
  // answers appended to button
  // values added to button

// If user clicks wrong button, timer penalty
// If user guesses right
  // destroy answer buttons
  // destroy question element
  // current question moved to selected questions array and current question cleared
  // random question added to current question
  // question is displayed in element
  // answer buttons created
  // answers appended to button 
  // values added to button

// Repeat until time runs out

// TODO: control start button through js. show button after game.