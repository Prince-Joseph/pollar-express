var pollIdElement = document.querySelector("#pollId");
var questionElement = document.querySelector("#question");
//@ts-ignore
var choicesElement = document.querySelector("#choices");
var pollId = pollIdElement === null || pollIdElement === void 0 ? void 0 : pollIdElement.value;
console.log(pollId);
function fetchUpdate(apiUrl) {
    fetch(apiUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        updateUI(data);
    });
}
function updateUI(data) {
    var _a, _b;
    questionElement.innerHTML = (_a = "\n    ".concat(data["question"], " ").concat(data["isActive"], " ").concat(data["expireAt"], "\n    <br> ").concat(data["timeLeft"], " secs <br> ").concat(data["count"], "\n    <br>").concat(data["voters"], "<br>\n    <br>").concat(data["latest_voters"], "<br>\n    ")) !== null && _a !== void 0 ? _a : "";
    var choices = data["choices"];
    choicesElement.innerHTML = "";
    // create new element
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        var choiceEl = document.createElement("p");
        choiceEl.innerHTML = (_b = "\n        ".concat(choice["value"], " ").concat(choice["count"], "\n        <br>\n        <div class=\"bar-container\">\n          <div style=\"width:").concat(Number(choice["count"]) / Number(data["count"]) * 100, "%;\" class=\"bar\"></div>\n        </div>\n        ")) !== null && _b !== void 0 ? _b : "";
        choicesElement.appendChild(choiceEl);
    }
}
var intervalId = window.setInterval(function () {
    fetchUpdate("/question/".concat(pollId, "/"));
}, 1000);
fetchUpdate("/question/".concat(pollId, "/"));
