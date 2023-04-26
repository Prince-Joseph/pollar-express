var votersListElement = document.querySelector("#voters-list");
var voterTemplate = votersListElement.children[0];
var pollIdElement = document.querySelector("#pollId");
var timeStatusElement = document.querySelector("#time-status");
//@ts-ignore
var choicesElement = document.querySelector("#choices");
var choiceTemplate = document.querySelector("#choice-template");
var pollId = pollIdElement === null || pollIdElement === void 0 ? void 0 : pollIdElement.value;
console.log(pollId);
function fetchUpdate(apiUrl) {
    fetch(apiUrl)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        updateUI(data);
    });
}
function TimeStatusElement(data) {
    if (data['isActive'] == true) {
        return ("".concat(data['timeLeft'], " left"));
    }
    else {
        return ("Question is not active");
    }
}
function ChoicesElement(data) {
    var choices = data["choices"];
    var choicesContainer = choicesElement.cloneNode(true);
    choicesContainer.innerHTML = "";
    // create new element
    for (var _i = 0, choices_1 = choices; _i < choices_1.length; _i++) {
        var choice = choices_1[_i];
        var choiceEl = choiceTemplate.cloneNode(true);
        var count_ratio = Number(choice["count"]) / Number(data["count"]) * 100;
        var count_ratio_cleaned = "";
        if (isNaN(count_ratio)) {
            count_ratio_cleaned = '0';
        }
        else {
            count_ratio_cleaned = count_ratio.toFixed(0);
        }
        choiceEl.children[0].innerHTML = "".concat(choice["value"]);
        choiceEl.children[1].innerHTML = "".concat(count_ratio_cleaned, "%");
        // @ts-ignore
        choiceEl.children[2].style.width = "".concat(count_ratio_cleaned, "%");
        choicesContainer.appendChild(choiceEl);
    }
    return choicesContainer.innerHTML;
}
function VotersElement(data) {
    var votersContainer = votersListElement.cloneNode(true);
    if (data['latest_voters']) {
        votersContainer.innerHTML = "";
        for (var _i = 0, _a = data['latest_voters']; _i < _a.length; _i++) {
            var voter = _a[_i];
            var voterEl = votersListElement.cloneNode(true);
            voterEl.innerHTML = voter;
            votersContainer.appendChild(voterEl);
        }
    }
    else {
        votersContainer.innerHTML = "";
    }
    return votersContainer.innerHTML;
}
function updateUI(data) {
    timeStatusElement.innerHTML = TimeStatusElement(data);
    //@ts-ignore
    // choicesElement.parentNode.replaceChild(ChoicesElement, choicesElement);
    choicesElement.innerHTML = ChoicesElement((data));
    votersListElement.innerHTML = VotersElement(data);
    console.log('hi');
}
var intervalId = window.setInterval(function () {
    fetchUpdate("/question/".concat(pollId, "/"));
}, 1000);
fetchUpdate("/question/".concat(pollId, "/"));
