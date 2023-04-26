var profileFormNameContainer = document.getElementById('name-form-container');
var profileFormRollNumberContainer = document.getElementById('rollnumber-form-container');
var profileFormMobileNumberContainer = document.getElementById('mobilenumber-form-container');
var nameInput = profileFormNameContainer === null || profileFormNameContainer === void 0 ? void 0 : profileFormNameContainer.querySelector('input');
var rollNumberInput = profileFormRollNumberContainer === null || profileFormRollNumberContainer === void 0 ? void 0 : profileFormRollNumberContainer.querySelector('input');
var mobileNumberInput = profileFormMobileNumberContainer === null || profileFormMobileNumberContainer === void 0 ? void 0 : profileFormMobileNumberContainer.querySelector('input');
var nameErrorContainer = profileFormNameContainer === null || profileFormNameContainer === void 0 ? void 0 : profileFormNameContainer.querySelector('.error-container');
var rollNumberErrorContainer = profileFormRollNumberContainer === null || profileFormRollNumberContainer === void 0 ? void 0 : profileFormRollNumberContainer.querySelector('.error-container');
var mobileNumberErrorContainer = profileFormMobileNumberContainer === null || profileFormMobileNumberContainer === void 0 ? void 0 : profileFormMobileNumberContainer.querySelector('.error-container');
nameInput === null || nameInput === void 0 ? void 0 : nameInput.addEventListener('input', function () {
    var nameValue = nameInput.value;
    console.log(nameValue);
    var max_length = 50;
    if (nameValue.length > max_length) {
        nameErrorContainer.children[0].innerHTML = "The name field should be less than or equal to ".concat(max_length, " characters in length.");
    }
    else if (!nameValue) {
        nameErrorContainer.children[0].innerHTML = "The name field is required.";
    }
    else {
        nameErrorContainer.children[0].innerHTML = "".concat(max_length - nameValue.length, " characters left");
    }
});
mobileNumberInput === null || mobileNumberInput === void 0 ? void 0 : mobileNumberInput.addEventListener('input', function () {
    var mobileNumberValue = mobileNumberInput.value;
    console.log(mobileNumberValue);
    var required_length = 10;
    if (!/^[0-9]*$/.test(mobileNumberValue)) {
        mobileNumberErrorContainer.children[0].innerHTML = "Should contain only Numbers.";
    }
    else if (!mobileNumberValue) {
        mobileNumberErrorContainer.children[0].innerHTML = "This field is required.";
    }
    else if (mobileNumberValue.length !== required_length) {
        mobileNumberErrorContainer.children[0].innerHTML = "".concat(required_length - mobileNumberValue.length, " digits left");
    }
    else {
        mobileNumberErrorContainer.children[0].innerHTML = "";
    }
});
rollNumberInput === null || rollNumberInput === void 0 ? void 0 : rollNumberInput.addEventListener('input', function () {
    var rollNumberValue = rollNumberInput.value;
    console.log(rollNumberValue);
    var required_length = 10;
    // \d{2}K8[15]A 
    // /\d{2}K8[15]A/
    if (rollNumberValue.length !== required_length) {
        rollNumberErrorContainer.children[0].innerHTML = "".concat(required_length - rollNumberValue.length, " characters left");
    }
    else if (!rollNumberValue) {
        rollNumberErrorContainer.children[0].innerHTML = "This field is required.";
    }
    else {
        rollNumberErrorContainer.children[0].innerHTML = "";
    }
    if (!/\d{2}K8[15]A/.test(rollNumberValue)) {
        rollNumberErrorContainer.children[1].innerHTML = "The Roll number is not valid";
    }
    else {
        rollNumberErrorContainer.children[1].innerHTML = "";
    }
});
