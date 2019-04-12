export var convertBase64ToBlob = function (base64) {
    var sliceSize = 512;
    var base64Data = base64.split(',')[1];
    var byteCharacters = atob(base64Data);
    var byteArrays = [];
    var _loop_1 = function (offset) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
        var byteNumbers = slice.split('').map(function (_, i) { return slice.charCodeAt(i); });
        var byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    };
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        _loop_1(offset);
    }
    return new Blob(byteArrays, { type: 'image/jpeg' });
};
//# sourceMappingURL=convertBase64ToBlob.js.map