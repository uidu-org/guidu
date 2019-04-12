import * as tslib_1 from "tslib";
export function dataURItoFile(dataURI, filename) {
    if (filename === void 0) { filename = 'untitled'; }
    if (dataURI.length === 0) {
        throw new Error('dataURI not found');
    }
    // convert base64/URLEncoded data component to raw binary data held in a string
    var dataURIParts = dataURI.split(',');
    var byteString = dataURIParts[0].indexOf('base64') >= 0
        ? atob(dataURIParts[1])
        : decodeURIComponent(dataURIParts[1]);
    // separate out the mime component
    var mimeString;
    try {
        mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];
    }
    catch (e) {
        // https://stackoverflow.com/questions/1176022/unknown-file-type-mime
        mimeString = 'application/octet-stream';
    }
    // write the bytes of the string to a typed array
    var intArray = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([intArray], { type: mimeString });
    try {
        return new File([blob], filename, { type: mimeString });
    }
    catch (e) {
        // IE11 does not allow the File constructor (yay!)
        // we get around this by decorating the blob instance with File properties
        // effectively casting up from Blob to File.
        var ie11File = blob;
        var date = new Date();
        ie11File.lastModified = date.getTime();
        ie11File.lastModifiedDate = date;
        ie11File.name = filename;
        ie11File.webkitRelativePath = '';
        return ie11File;
    }
}
export function fileToDataURI(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            var result = reader.result;
            if (typeof result === 'string') {
                resolve(result);
            }
            else if (result === null) {
                reject();
            }
        });
        reader.addEventListener('error', reject);
        reader.readAsDataURL(blob);
    });
}
export function getFileInfo(file, src) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = {
                        file: file
                    };
                    _b = src;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, fileToDataURI(file)];
                case 1:
                    _b = (_c.sent());
                    _c.label = 2;
                case 2: return [2 /*return*/, (_a.src = _b,
                        _a)];
            }
        });
    });
}
export function getFileInfoFromSrc(src, file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = {};
                    _b = file;
                    if (_b) return [3 /*break*/, 2];
                    return [4 /*yield*/, dataURItoFile(src)];
                case 1:
                    _b = (_c.sent());
                    _c.label = 2;
                case 2: return [2 /*return*/, (_a.file = _b,
                        _a.src = src,
                        _a)];
            }
        });
    });
}
export function fileToArrayBuffer(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
            var array = new Uint8Array(reader.result);
            resolve(array);
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(file);
    });
}
export function loadImage(src) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            resolve(img);
        };
        img.onerror = reject;
    });
}
//# sourceMappingURL=util.js.map