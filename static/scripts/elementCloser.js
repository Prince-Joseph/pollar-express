var elementCloser = document.querySelectorAll("[data-close]");
var _loop_1 = function (closer) {
    closer.style.cursor = "pointer";
    closer.addEventListener('click', function () {
        var _a;
        var closableElementID = (_a = closer.dataset.close) !== null && _a !== void 0 ? _a : "";
        var closableElement = document.getElementById(closableElementID);
        closableElement.style.display = 'none';
    });
};
//@ts-ignore
for (var _i = 0, elementCloser_1 = elementCloser; _i < elementCloser_1.length; _i++) {
    var closer = elementCloser_1[_i];
    _loop_1(closer);
}
