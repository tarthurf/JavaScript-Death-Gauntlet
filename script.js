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