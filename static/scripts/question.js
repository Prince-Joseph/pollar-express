var questionElement = document.querySelector("#question");
var choicesElement = document.querySelector("#choices");
function fetchUpdate(apiUrl) {
    fetch(apiUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        updateUI(data);
    });
}
function updateUI(data) {
    var _a, _b;
    questionElement.innerHTML = (_a = "".concat(data["question"], " ").concat(data["isActive"], " ").concat(data["expireAt"], " <br> ").concat(data["timeLeft"], " secs")) !== null && _a !== void 0 ? _a : "";
    var choices = data["choices"];
    choicesElement.innerHTML = "";
    // create new element
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        var choiceEl = document.createElement("p");
        choiceEl.innerHTML = (_b = "".concat(choice["value"], " ").concat(choice["count"])) !== null && _b !== void 0 ? _b : "";
        choicesElement.appendChild(choiceEl);
    }
}
var intervalId = window.setInterval(function () {
    fetchUpdate('/question/1/');
}, 1000);
