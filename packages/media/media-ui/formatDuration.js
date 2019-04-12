var pad = function (n) {
    return n < 10 ? "0" + n : n;
};
var isInvalidInput = function (seconds) {
    return isNaN(seconds) || seconds === Infinity || seconds < 0;
};
export var formatDuration = function (seconds) {
    if (isInvalidInput(seconds)) {
        return '0:00';
    }
    var totalSeconds = parseInt("" + seconds, 10);
    var hours = Math.floor(totalSeconds / 3600);
    var remainingSeconds = totalSeconds % 3600;
    var minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds %= 60;
    var prettyHoursWithSeparator = hours > 0 ? hours + ':' : '';
    var prettyMinutes = prettyHoursWithSeparator ? pad(minutes) : minutes;
    return "" + prettyHoursWithSeparator + prettyMinutes + ":" + pad(remainingSeconds);
};
//# sourceMappingURL=formatDuration.js.map