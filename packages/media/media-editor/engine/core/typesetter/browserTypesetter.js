import * as tslib_1 from "tslib";
import { Typeset } from './typeset';
import { FontInfo } from './fontInfo';
// The core needs typesets to render text.
// This class is responsible for storing and providing typesets.
var BrowserTypesetter = /** @class */ (function () {
    function BrowserTypesetter(config) {
        this.config = config;
        this.typesets = [];
        this.fontInfo = new FontInfo(this.config.textHelperDiv);
    }
    BrowserTypesetter.prototype.unload = function () {
        this.typesets.forEach(function (typeset) { return typeset.unload(); });
    };
    // Creates a new typeset, returns its index.
    // The newly created typeset must exist until it is explicitly deleted with deleteTypeset() regardless context loss.
    BrowserTypesetter.prototype.createTypeset = function () {
        var typeset = new Typeset(tslib_1.__assign({}, this.config, { fontInfo: this.fontInfo }));
        return this.typesets.push(typeset) - 1;
    };
    BrowserTypesetter.prototype.deleteTypeset = function (index) {
        this.typesets[index].unload();
    };
    BrowserTypesetter.prototype.getTypeset = function (index) {
        return this.typesets[index];
    };
    BrowserTypesetter.prototype.handleContextLost = function () {
        this.typesets.forEach(function (typeset) { return typeset.contextLost(); });
    };
    BrowserTypesetter.prototype.handleContextRestored = function () {
        this.typesets.forEach(function (typeset) { return typeset.contextRestored(); });
    };
    return BrowserTypesetter;
}());
export { BrowserTypesetter };
//# sourceMappingURL=browserTypesetter.js.map