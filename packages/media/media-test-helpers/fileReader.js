import * as tslib_1 from "tslib";
var MockFileReader = /** @class */ (function () {
    function MockFileReader(result) {
        if (result === void 0) { result = 'mockResult'; }
        var _this = this;
        this.loadEvent = function () { };
        this.errorEvent = function (_) { };
        this.addEventListener = jest.fn().mockImplementation(function (eventName, fn) {
            if (eventName === 'load') {
                _this.loadEvent = fn;
            }
            else if (eventName === 'error') {
                _this.errorEvent = fn;
            }
        });
        this.readAsDataURL = jest.fn().mockImplementation(function () {
            _this.loadEvent();
        });
        this.readAsArrayBuffer = jest.fn().mockImplementation(function () {
            _this.loadEvent();
        });
        this.result = result;
    }
    return MockFileReader;
}());
var mockFileReaderError = { message: 'error' };
var MockFileReaderWithError = /** @class */ (function (_super) {
    tslib_1.__extends(MockFileReaderWithError, _super);
    function MockFileReaderWithError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readAsDataURL = jest.fn().mockImplementation(function () {
            _this.errorEvent(mockFileReaderError);
        });
        return _this;
    }
    return MockFileReaderWithError;
}(MockFileReader));
var GlobalFileReader = global.FileReader;
var FileReader;
if (global.FileReader && typeof jest !== 'undefined') {
    FileReader = jest
        .spyOn(global, 'FileReader')
        .mockImplementation(function () { return new GlobalFileReader(); });
}
var mockFileReader = function (result) {
    var fileReader = new MockFileReader(result);
    FileReader.mockImplementation(function () { return fileReader; });
    return fileReader;
};
var mockFileReaderWithError = function () {
    var fileReader = new MockFileReaderWithError();
    FileReader.mockImplementation(function () { return fileReader; });
    return fileReader;
};
var unmockFileReader = function () {
    return FileReader.mockImplementation(function () { return new GlobalFileReader(); });
};
export { mockFileReader, mockFileReaderWithError, unmockFileReader, mockFileReaderError, };
//# sourceMappingURL=fileReader.js.map