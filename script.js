let timerCounter = 0
const timerPenalty = 1

const selectedQuestions = [];
let currentQuestion = {};


function randomUpToMax(max) {
    return Math.floor(Math.random() * max);
}

// This function updates a the timer on the page
function updatePageTimer() {
    $("#timer").text(timerCounter);
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
// addButtons("#answer-buttons", 5);

function deleteElementsFromParent(parentEl, x) {
  for (let i = 0; i < x; i++) {
    $(parentEl).empty();
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


// this function sets a boolean to right and wrong dom elements
function setAnswerValues(element, x) {
  const objectKeyArray = Object.keys(currentQuestion.answers)
  for (let i = 0; i < x; i++) {
    const buttonNumber = (i + 1);
    const buttonNumberToString = buttonNumber.toString();
    console.log(objectKeyArray[i]);
    console.log(currentQuestion.correctAnswer);
    if (objectKeyArray[i] === currentQuestion.correctAnswer) {
      $(element + buttonNumberToString).attr("value", true)
    }
    else {
      $(element + buttonNumberToString).attr("value", false)
    }
  }
}

// This function penalizes the user for guessing a wrong answer
$("button").on("click", function() {
  console.log(this);
  let buttonValue = $(this).attr("value");
  console.log(`Button value is: ${buttonValue}`);
  if (timerCounter > 0 && buttonValue === "false") {
    timerCounter -= timerPenalty;
    updatePageTimer();
  } 
});

$("#start-timer").on("click", () => startTimer(30)); // this is only for testing purposes

selectQuestion(); //This is just for testing purposes
console.log(currentQuestion.correctAnswer); //This is just for testing purposes
console.log(Object.keys(currentQuestion)); //This is just for testing purposes

$("#button4").on("click", () => displayAnswerButtons("#button", 5)); // this is only for testing purposes

$("#button5").on("click", () => setAnswerValues("#button", 5)); // this is only for testing purposes

