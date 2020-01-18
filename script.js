let timerCounter = 0
const timerPenalty = 1

const selectedQuestions = [];
let currentQuestion = {};

function randomUpToMax(max) {
    return Math.floor(Math.random() * max);
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

function updatePageTimer() {
    $("#timer").text(timerCounter);
}

function displayQuestion(question) {
	$("#questions").text(question);
}

function selectQuestion() {
    currentQuestion = myQuestions.splice(randomUpToMax(myQuestions.length), 1).pop();
  }

  $("#button2").on("click", function() {
    displayRandomQuestion();
  })
  
  $("#start-timer").on("click", () => startTimer(5));

$("#button1").text(currentQuestion.answers.a).on("click", function() {
    if (timerCounter > 0) {
        timerCounter -= timerPenalty;
        updatePageTimer();
    }
});

selectQuestion();
console.log(currentQuestion);
displayQuestion(currentQuestion.question);

// TODO: create buttons
// TODO: functionize wrong answers