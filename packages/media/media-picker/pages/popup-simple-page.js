import * as tslib_1 from "tslib";
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';
/**
 * Popup Simple Example Page Object
 * @see https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern
 */
var PopupSimplePage = /** @class */ (function () {
    function PopupSimplePage(page) {
        this.page = page;
    }
    PopupSimplePage.prototype.clickUploadButton = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var selector;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selector = '.e2e-upload-button';
                        return [4 /*yield*/, this.page.waitForSelector(selector)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.click(selector)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupSimplePage.prototype.getRecentUploadCards = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var selector, results;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selector = '.e2e-recent-upload-card';
                        return [4 /*yield*/, this.page.getHTML(selector)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results.map(function (html) {
                                var div = document.createElement('div');
                                div.innerHTML = html.trim();
                                var element = div.querySelector('.title .ellipsed-text');
                                return {
                                    filename: element && element.textContent,
                                };
                            })];
                }
            });
        });
    };
    PopupSimplePage.prototype.getRecentUploadCard = function (filename) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitUntil(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getRecentUploadCards()];
                                case 1: return [2 /*return*/, (_a.sent()).some(cardWithFilename(filename))];
                            }
                        }); }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getRecentUploadCards()];
                    case 2: return [2 /*return*/, (_a.sent()).find(cardWithFilename(filename))];
                }
            });
        });
    };
    PopupSimplePage.prototype.clickInsertButton = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.click('.e2e-insert-button')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupSimplePage.prototype.getEvents = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.page.getText('#events')];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    PopupSimplePage.prototype.getEvent = function (name) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var events, event;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitUntil(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.getEvents()];
                                case 1: return [2 /*return*/, (_a.sent()).some(eventWithName(name))];
                            }
                        }); }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getEvents()];
                    case 2:
                        events = _a.sent();
                        event = events.find(eventWithName(name));
                        if (event) {
                            return [2 /*return*/, event];
                        }
                        else {
                            throw new Error("Event " + name + " not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PopupSimplePage.prototype.uploadFile = function (localPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clickUploadButton()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.page.chooseFile('input', localPath)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return PopupSimplePage;
}());
export { PopupSimplePage };
export function gotoPopupSimplePage(client) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var page, url;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = new Page(client);
                    url = getExampleUrl('media', 'media-picker', 'popup-simple');
                    return [4 /*yield*/, page.goto(url)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new PopupSimplePage(page)];
            }
        });
    });
}
function eventWithName(name) {
    return function (event) { return event.name === name; };
}
function cardWithFilename(filename) {
    return function (card) { return card.filename === filename; };
}
//# sourceMappingURL=popup-simple-page.js.map