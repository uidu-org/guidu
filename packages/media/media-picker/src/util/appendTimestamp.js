var padZero = function (n) { return (n < 10 ? "0" + n : "" + n); };
export var appendTimestamp = function (fileName, timestamp) {
    var dotPosition = fileName.lastIndexOf('.');
    var containsDot = dotPosition > 0;
    var fileNameWithoutExtension = containsDot
        ? fileName.substring(0, dotPosition)
        : fileName;
    var extension = containsDot ? fileName.substring(dotPosition) : '';
    var date = new Date(timestamp);
    var formattedDate = "" + date.getUTCFullYear() + padZero(date.getUTCMonth() + 1) + padZero(date.getUTCDate());
    var formattedTime = "" + padZero(date.getUTCHours()) + padZero(date.getUTCMinutes()) + padZero(date.getUTCSeconds());
    return fileNameWithoutExtension + "-" + formattedDate + "-" + formattedTime + extension;
};
//# sourceMappingURL=appendTimestamp.js.map