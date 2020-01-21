let timerCounter = 0
const timerPenalty = 1

const selectedQuestions = [];
let currentQuestion = {};

const buttonNumber = (i + 1);
const buttonNumberToString = buttonNumber.toString();

// this functions grabs a random question object from myQuestions.js
function selectQuestion() {
  currentQuestion = myQuestions.splice(randomUpToMax(myQuestions.length), 1).pop();
}

function randomUpToMax(max) {
    return Math.floor(Math.random() * max);
}

function updatePageTimer() {
    $("#timer").text(timerCounter);
}

// this function displays a question from questions.js
function displayQuestion(element) {
	$(element).text(currentQuestion.question);
}

function displayAnswerButtons(element, x) {
  for (let i = 0; i < x; i++) {
    // const buttonNumber = (i + 1);
    // const buttonNumberToString = buttonNumber.toString();
    $(element + buttonNumberToString).text(currentQuestion.answers[buttonNumber]);

    console.log($(element + i));
  }
}

// TODO: Create function that checks the correct answer and adds values to the DOM elements
function setAnswerValues(element, x) {
  const objectKeyArray = Object.keys(currentQuestion.answers)
  for (let i = 0; i < x; i++) {
    // const buttonNumber = (i + 1);
    // const buttonNumberToString = buttonNumber.toString();
    console.log(objectKeyArray)
    if (objectKeyArray[i] === currentQuestion.correctAnswer) {
      $(element + buttonNumberToString).attr("value", true)
    }
    else {
      $(element + buttonNumberToString).attr("value", false)
    }
  }
}

// TODO: functionize timer penalty
// function timerPenalty() {

// }

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

// this function will add any number of buttons to an element in HTML
function addButtons(parentEl, x) {
  for (let i = 0; i < x; i++) {
    // const buttonNumber = (i + 1);
    // const buttonNumberToString = buttonNumber.toString();
    $(parentEl).append("<button></button>")
    $(parentEl + ":nth-child(" + buttonNumberToString + ")").attr({id:"button" + buttonNumber, type:"button"});
    // console.log(`${"button" + i.toString()}`);
  }
}

$("#button2").on("click", function() { // this is only for testing purposes
  displayQuestion();
})

$("#start-timer").on("click", () => startTimer(5)); // this is only for testing purposes

selectQuestion(); //This is just for testing purposes
console.log(currentQuestion.correctAnswer); //This is just for testing purposes
console.log(Object.keys(currentQuestion)); //This is just for testing purposes

$("#button1").text(currentQuestion.answers.a).on("click", function() { // This is only for testing purposes
  if (timerCounter > 0) {
    timerCounter -= timerPenalty;
    updatePageTimer();
  }
});

$("#button3").on("click", () => addButtons(".answer-buttons", 5)); // this is only for testing purposes

$("#button4").on("click", () => displayAnswerButtons("#button", 5)); // this is only for testing purposes

$("#button5").on("click", () => setAnswerValues("#button", 5)); // this is only for testing purposes

// functionize wrong answers