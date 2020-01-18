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


$("#button2").on("click", function() {
  displayQuestion();
})

$("#start-timer").on("click", () => startTimer(5));

selectQuestion();
console.log(currentQuestion);
displayQuestion(currentQuestion.question);

$("#button1").text(currentQuestion.answers.a).on("click", function() {
  if (timerCounter > 0) {
    timerCounter -= timerPenalty;
    updatePageTimer();
  }
});

// create buttons
// functionize wrong answers