var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var snoozeButton = document.getElementById("snooze");
var timerElement = document.getElementById("timer");
var questionActiveElement = document.getElementById("question-active");
//@ts-ignore
var choicesElement = document.getElementById("choices");
var questionIdHidden = document.getElementById("pollId");
var questionId = questionIdHidden.value;
startButton.addEventListener("click", function () {
    fetch("/question/start/".concat(questionId, "/"));
});
stopButton.addEventListener("click", function () {
    fetch("/question/stop/".concat(questionId, "/"));
});
snoozeButton.addEventListener("click", function () {
    fetch("/question/snooze/".concat(questionId, "/"));
});
function updateQuestionManagerUI(questionData) {
    if (questionData.isActive) {
        timerElement.innerHTML = "".concat(questionData.timeLeft);
        questionActiveElement.innerHTML = "Active";
        questionActiveElement.style.display = 'grid';
    }
    else {
        timerElement.innerHTML = "00:00";
        questionActiveElement.style.display = 'none';
    }
}
function fetchQuestionData() {
    fetch("/question/".concat(questionId, "/"))
        .then(function (res) { return res.json(); })
        .then(function (data) { return updateQuestionManagerUI(data); });
}
var intervalId = window.setInterval(function () {
    fetchQuestionData();
}, 500);
