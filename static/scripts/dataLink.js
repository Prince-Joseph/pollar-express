// Select all elements which have data-link attribute
// add click event to each elemetn
// retrieve the link url and redirect to that page
var clickableElements = document.querySelectorAll("[data-link]");
var _loop_1 = function (clickableElement) {
    clickableElement.style.cursor = "pointer";
    clickableElement.addEventListener('click', function () {
        var _a;
        window.location.href = (_a = clickableElement.dataset.link) !== null && _a !== void 0 ? _a : "#";
    });
};
//@ts-ignore
for (var _i = 0, clickableElements_1 = clickableElements; _i < clickableElements_1.length; _i++) {
    var clickableElement = clickableElements_1[_i];
    _loop_1(clickableElement);
}
