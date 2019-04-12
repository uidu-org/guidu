import * as tslib_1 from "tslib";
/* tslint:disable variable-name */
import * as React from 'react';
import { Component } from 'react';
import { Card, defaultImageCardDimensions, CardView, } from '@uidu/media-card';
import { FilmstripView } from './filmstripView';
import { generateIdentifierKey } from './utils/generateIdentifierKey';
var Filmstrip = /** @class */ (function (_super) {
    tslib_1.__extends(Filmstrip, _super);
    function Filmstrip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            animate: false,
            offset: 0,
        };
        _this.handleSize = function (_a) {
            var offset = _a.offset;
            return _this.setState({ offset: offset });
        };
        _this.handleScroll = function (_a) {
            var animate = _a.animate, offset = _a.offset;
            return _this.setState({ animate: animate, offset: offset });
        };
        return _this;
    }
    Filmstrip.prototype.renderCards = function () {
        var _a = this.props, items = _a.items, context = _a.context;
        var cards = items.map(function (item) {
            var key = generateIdentifierKey(item.identifier);
            if (!context) {
                return (React.createElement(CardView, { key: key, status: "loading", dimensions: defaultImageCardDimensions }));
            }
            return (React.createElement(Card, tslib_1.__assign({ key: key, context: context, dimensions: defaultImageCardDimensions, useInlinePlayer: false }, item)));
        });
        return cards;
    };
    Filmstrip.prototype.render = function () {
        var _a = this.state, animate = _a.animate, offset = _a.offset;
        return (React.createElement(FilmstripView, { animate: animate, offset: offset, onSize: this.handleSize, onScroll: this.handleScroll }, this.renderCards()));
    };
    return Filmstrip;
}(Component));
export { Filmstrip };
//# sourceMappingURL=filmstrip.js.map