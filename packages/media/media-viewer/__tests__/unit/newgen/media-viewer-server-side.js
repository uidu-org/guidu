var _this = this;
import * as tslib_1 from "tslib";
/**
 * @jest-environment node
 */
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getExamplesFor } from '@uidu/build-utils/getExamples';
test('media-viewer server side rendering', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getExamplesFor('media-viewer')];
            case 1:
                (_a.sent()).forEach(function (examples) {
                    var Example = require(examples.filePath).default;
                    expect(function () { return ReactDOMServer.renderToString(React.createElement(Example, null)); }).not.toThrowError();
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=media-viewer-server-side.js.map