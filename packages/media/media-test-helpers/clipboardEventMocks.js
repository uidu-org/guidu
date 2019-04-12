import * as tslib_1 from "tslib";
// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
var MockFile = /** @class */ (function () {
    function MockFile(options) {
        if (options === void 0) { options = {
            type: '',
            name: 'some-file.png',
        }; }
        this.lastModified = 1234;
        this.type = options.type;
        this.name = options.name;
        this.size = 0;
        this.webkitRelativePath = '';
    }
    MockFile.prototype.msClose = function () { };
    MockFile.prototype.msDetachStream = function () { };
    MockFile.prototype.slice = function () {
        throw new Error('not implemented');
    };
    return MockFile;
}());
export { MockFile };
// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
var MockFileList = /** @class */ (function (_super) {
    tslib_1.__extends(MockFileList, _super);
    function MockFileList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockFileList.prototype.item = function (index) {
        return this[index];
    };
    MockFileList.fromArray = function (files) {
        var list = new MockFileList();
        files.forEach(function (file) { return list.push(file); });
        return list;
    };
    return MockFileList;
}(Array));
export { MockFileList };
// this isn't implemented by JSDOM so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
var MockDataTransfer = /** @class */ (function () {
    function MockDataTransfer(files, types, items, dropEffect, effectAllowed) {
        if (types === void 0) { types = []; }
        if (items === void 0) { items = []; }
        if (dropEffect === void 0) { dropEffect = ''; }
        if (effectAllowed === void 0) { effectAllowed = ''; }
        this.files = files;
        this.types = types;
        this.items = items;
        this.dropEffect = dropEffect;
        this.effectAllowed = effectAllowed;
    }
    MockDataTransfer.prototype.clearData = function () {
        return false;
    };
    MockDataTransfer.prototype.getData = function () {
        return '';
    };
    MockDataTransfer.prototype.setData = function () {
        return false;
    };
    MockDataTransfer.prototype.setDragImage = function () { };
    return MockDataTransfer;
}());
export { MockDataTransfer };
// this isn't implemented by JSDOM, and JSDOM .dispatchEvent() requires that event is an instanceof event,
// so we've implemented it to make Typescript happy
// see https://github.com/tmpvar/jsdom/issues/1568
export var getMockClipboardEvent = function () {
    return /** @class */ (function (_super) {
        tslib_1.__extends(MockClipboardEvent, _super);
        function MockClipboardEvent(event, files, types) {
            if (files === void 0) { files = []; }
            if (types === void 0) { types = []; }
            var _this = _super.call(this, event) || this;
            _this.clipboardData = new MockDataTransfer(MockFileList.fromArray(files), types);
            return _this;
        }
        return MockClipboardEvent;
    }(Event));
};
export var MockDragEvent = function () {
    return /** @class */ (function (_super) {
        tslib_1.__extends(MockDragEvent, _super);
        function MockDragEvent(event, files) {
            if (files === void 0) { files = []; }
            var _this = _super.call(this, event) || this;
            _this.dataTransfer = new MockDataTransfer(MockFileList.fromArray(files));
            return _this;
        }
        MockDragEvent.prototype.initDragEvent = function () {
            // noop
        };
        MockDragEvent.prototype.msConvertURL = function () {
            // noop
        };
        return MockDragEvent;
    }(MouseEvent));
};
//# sourceMappingURL=clipboardEventMocks.js.map