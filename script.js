let timerCounter = 0
const timerPenalty = 1

const selectedQuestions = [];
let currentQuestion = {};

function selectQuestion() {
  currentQuestion = myQuestions.splice(randomUpToMax(myQuestions.length), 1).pop();
}

function randomUpToMax(max) {
    return Math.floor(Math.random() * max);
}

function updatePageTimer() {
    $("#timer").text(timerCounter);
}

function displayQuestion(question) {
	$("#questions").text(question);
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

// this function will add any number of buttons to an element in HTML
function addButtons(parentEl, x) {
  for (let i = 0; i < x; i++) {
    $(parentEl).append(
      $('<button>').attr({id:"button" + (i+1), class:""}));
    console.log(`Button ${i} made!`);
  }
}

$("#button2").on("click", function() { // this is only for testing purposes
  displayQuestion();
})

$("#start-timer").on("click", () => startTimer(5)); // this is only for testing purposes

selectQuestion();
console.log(currentQuestion);
displayQuestion(currentQuestion.question);

$("#button1").text(currentQuestion.answers.a).on("click", function() { // This is only for testing purposes
  if (timerCounter > 0) {
    timerCounter -= timerPenalty;
    updatePageTimer();
  }
});

$("#button3").on("click", () => addButtons(".answer-buttons", 5)); // this is only for testing purposes

// functionize wrong answers