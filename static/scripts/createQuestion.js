// createQuestion.ts
var choiceInputContainer = document.querySelector('[name="value"]');
var choiceErrorContainer = document.getElementById("choice-errors");
if (choiceErrorContainer) {
    choiceErrorContainer.innerHTML = "Maximum of 50 characters are allowed";
}
if (choiceInputContainer) {
    choiceInputContainer.addEventListener('input', function () {
        var lengthChoice = choiceInputContainer.value.length;
        var lengthLeft = String(50 - lengthChoice);
        choiceErrorContainer.innerHTML = "".concat(lengthLeft, " characters left");
    });
}
var questionInputContainer = document.querySelector('[name="question"]');
var questionErrorsContainer = document.getElementById("question-errors");
if (questionErrorsContainer) {
    questionErrorsContainer.innerHTML = "Maximum of 250 characters are allowed";
}
if (questionInputContainer) {
    questionInputContainer.addEventListener('input', function () {
        var lengthQuestion = questionInputContainer.value.length;
        var lengthLeft = String(250 - lengthQuestion);
        questionErrorsContainer.innerHTML = "".concat(lengthLeft, " characters left");
    });
}
var durationTime = document.querySelector('[name="duration"]');
var durationRemainingTime = document.getElementById("duration-error-message");
var _is_alphabet = /[a-zA-Z]/;
if (durationRemainingTime) {
    var durationValue = durationTime.value;
    if (durationValue === "") {
        durationRemainingTime.innerHTML = "";
    }
    else {
        durationRemainingTime.innerHTML = parseDuration(durationValue);
    }
}
if (durationTime) {
    durationTime.addEventListener('input', function () {
        var durationValue = durationTime.value;
        console.log(durationValue);
        if (durationValue === "") {
            durationRemainingTime.innerHTML = "";
        }
        else {
            if (_is_alphabet.test(durationValue)) {
                durationRemainingTime.innerHTML = "Invalid duration";
            }
            else {
                var durationInWords = parseDuration(durationValue);
                console.log(parseDuration(durationValue));
                durationRemainingTime.innerHTML = durationInWords;
            }
        }
    });
}
//  STRING TO WORD TIME
// Returns a duration string in the format "HH hours MM minutes SS seconds"
function parseDuration(duration) {
    var match = duration.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);
    if (match) {
        var hours = parseInt(match[1], 10);
        var minutes = parseInt(match[2], 10);
        var seconds_1 = parseInt(match[3], 10);
        return "".concat(hours, " hours ").concat(minutes, " minutes ").concat(seconds_1, " seconds");
    }
    var matchWithoutHours = duration.match(/^(\d{1,2}):(\d{2})$/);
    if (matchWithoutHours) {
        var minutes = parseInt(matchWithoutHours[1], 10);
        var seconds_2 = parseInt(matchWithoutHours[2], 10);
        return "".concat(minutes, " minutes ").concat(seconds_2, " seconds");
    }
    var seconds = parseInt(duration, 10);
    if (!isNaN(seconds)) {
        return "".concat(seconds, " seconds");
    }
    return 'Invalid duration';
}
